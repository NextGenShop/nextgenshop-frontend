import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import StopIcon from "@material-ui/icons/StopOutlined";
import IconButton from "@material-ui/core/IconButton";
import MicRoundedIcon from "@material-ui/icons/MicRounded";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { actions } from "../store/api/tokens";
import { actions as basketActions } from "../store/api/basket";
import { actions as productActions } from "../store/api/product";
import {
  getSupportedAudioFormat,
  captureAudioFromMicrophone,
  textToSpeech,
  createAssistantSession,
  messageAssistant,
  stripSSMLTags,
} from "../utils/speechUtils";
import { addBasketItem } from "../utils/basketUtils";
import AvatarModel from "../assets/models/Avatar.glb";
import { displayToast } from "../utils/displayToast";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    color: theme.palette.text.secondary,
    background: "#eeeeee",
    height: "75vh",
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  transcript: {
    wordWrap: "break-word",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

function ArtificialCashier({
  authUser,
  basket,
  products,
  speechToTextToken,
  speechToTextUrl,
  textToSpeechToken,
  textToSpeechUrl,
  assistantToken,
  assistantUrl,
  dispatchGetSpeechToTextToken,
  dispatchGetTextToSpeechToken,
  dispatchGetAssistantToken,
  dispatchUpdateBasket,
  dispatchGetProducts,
}) {
  const classes = useStyles();
  const [loaded, setLoaded] = React.useState(false);
  const [listening, setListening] = React.useState(false);
  const [responding, setResponding] = React.useState(false);
  const [stream, setStream] = React.useState(null);
  const [speechText, setSpeechText] = React.useState("");
  const [responseText, setResponseText] = React.useState("");
  const [assistantSessionId, setAssistantSessionId] = React.useState(null);
  const audioRef = React.useRef(null);

  const testVoices = [
    "en-GB_JamesV3Voice",
    "en-GB_KateV3Voice",
    "en-GB_CharlotteV3Voice",
  ];
  //ref: https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-voices

  React.useEffect(() => {
    if (!speechToTextToken || !speechToTextUrl) {
      dispatchGetSpeechToTextToken();
    }
    if (!textToSpeechToken || !textToSpeechUrl) {
      dispatchGetTextToSpeechToken();
    }
    if (!assistantToken || !assistantUrl) {
      dispatchGetAssistantToken();
    }
  }, [
    dispatchGetSpeechToTextToken,
    dispatchGetTextToSpeechToken,
    dispatchGetAssistantToken,
    speechToTextToken,
    speechToTextUrl,
    textToSpeechToken,
    textToSpeechUrl,
    assistantToken,
    assistantUrl,
  ]);

  React.useEffect(() => {
    async function createSession() {
      const instanceId = await createAssistantSession(
        assistantUrl,
        assistantToken
      );
      setAssistantSessionId(instanceId);
      setLoaded(true);
      console.log("Done loading tokens from API.");
      console.log("Created assistant session: " + instanceId);
    }

    if (!!assistantToken && !!assistantUrl && !assistantSessionId) {
      createSession();
    }
  }, [assistantToken, assistantUrl, assistantSessionId]);

  const startListening = async () => {
    stopAudio();
    setListening(true);
    const stream = await captureAudioFromMicrophone(
      speechToTextUrl,
      speechToTextToken
    );
    stream.on("data", async (data) => {
      if (data && data.final) {
        const speechText = data.alternatives[0].transcript;
        setSpeechText(speechText);
        setListening(false);

        const res = await messageAssistant(
          assistantUrl,
          assistantToken,
          assistantSessionId,
          speechText
        );

        if (res.action) {
          handleAssistantAction(res.action);
        }

        if (res.speech) {
          await synthesizeTextToSpeech(res.speech);
        }
      }
    });
    stream.on("error", function (err) {
      console.log(err);
      setListening(false);
    });
    stream.on("end", function () {
      console.log("stream ended");
      setListening(false);
    });
    setStream(stream);
  };

  React.useEffect(() => {
    if (!listening && stream !== null) {
      stream.stop();
      setStream(null);
    }
  }, [listening, stream]);

  const handleAssistantAction = (action) => {
    switch (action.action_type) {
      case "add_basket":
        const product = products.find(
          (p) => p.productId === parseInt(action.product_id)
        );
        if (product) {
          const newBasket = addBasketItem(product, basket, action.quantity);
          dispatchUpdateBasket(authUser.userId, newBasket);
          displayToast("", "Your shopping basket has been updated", "success");
        }
        break;
      case "filter_product":
        if (action.product_query_string) {
          dispatchGetProducts(action.product_query_string, "Mock Retailer", 3);
          displayToast(
            "",
            "The product catalogue has been updated to match your query",
            "info"
          );
        }
        break;
      case "reset_context":
        resetProductCatalog();
        break;
      default:
        break;
    }
  };

  const resetProductCatalog = () => {
    dispatchGetProducts(null, "Mock Retailer", 9);
  };

  const handleAudioPlayingEvent = () => {
    console.log("AUDIO PLAYING!");
    setResponding(true);
  };

  const handleAudioEndedEvent = () => {
    console.log("AUDIO STOPPED PLAYING!");
    setResponding(false);
  };

  const synthesizeTextToSpeech = async (text, voice) => {
    if (!voice) voice = testVoices[0];
    try {
      const accept = getSupportedAudioFormat(audioRef);
      const audio = await textToSpeech(
        textToSpeechUrl,
        textToSpeechToken,
        text,
        voice,
        accept,
        audioRef.current
      );
      setResponseText(stripSSMLTags(text));
      audio.removeEventListener("playing", handleAudioPlayingEvent);
      audio.removeEventListener("ended", handleAudioEndedEvent);
      audio.addEventListener("playing", handleAudioPlayingEvent);
      audio.addEventListener("ended", handleAudioEndedEvent);
    } catch (err) {
      console.log(err);
    }
  };

  const stopAudio = () => {
    setResponseText("");
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const ListenButton = listening ? (
    <IconButton
      color="secondary"
      aria-label="stop"
      onClick={() => setListening(false)}
    >
      <StopIcon fontSize="large" />
    </IconButton>
  ) : (
    <IconButton color="primary" aria-label="speak" onClick={startListening}>
      <MicRoundedIcon fontSize="large" />
    </IconButton>
  );

  return (
    <Paper className={classes.paper}>
      <audio ref={audioRef}>
        Your browser does not support the <code>audio</code> element.
      </audio>
      <div className={classes.inner}>
        {loaded ? (
          <React.Fragment>
            {/* {speechText && (
              <Typography variant="h6">
                <span className={classes.bold}>Speech:</span> {speechText}
              </Typography>
            )} */}
            <model-viewer
              autoplay
              loading="eager"
              animation-name={responding ? "Talking" : "Idle"}
              style={{ width: "350px", height: "350px" }}
              src={AvatarModel}
            ></model-viewer>
            {responseText && (
              <Typography className={classes.transcript} variant="h6">
                {responseText}
              </Typography>
            )}
            <br />
            <Typography variant="subtitle2">
              {listening
                ? "Listening..."
                : "Press the mic icon and start speaking"}
            </Typography>
            {ListenButton}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography variant="subtitle2" gutterBottom>
              Loading... Please wait
            </Typography>
            <CircularProgress size={30} />
          </React.Fragment>
        )}
      </div>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  speechToTextToken: state.tokens.speechToTextToken,
  speechToTextUrl: state.tokens.speechToTextUrl,
  textToSpeechToken: state.tokens.textToSpeechToken,
  textToSpeechUrl: state.tokens.textToSpeechUrl,
  assistantToken: state.tokens.assistantToken,
  assistantUrl: state.tokens.assistantUrl,
  basket: state.basket,
  authUser: state.auth.user,
  products: state.product.products,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetSpeechToTextToken: () => dispatch(actions.getSpeechToTextToken()),
  dispatchGetTextToSpeechToken: () => dispatch(actions.getTextToSpeechToken()),
  dispatchGetAssistantToken: () => dispatch(actions.getAssistantToken()),
  dispatchUpdateBasket: (shopperId, basketData) =>
    dispatch(basketActions.updateBasket(shopperId, basketData)),
  dispatchGetProducts: (query, retailer, limit) =>
    dispatch(productActions.getProducts(query, retailer, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtificialCashier);
