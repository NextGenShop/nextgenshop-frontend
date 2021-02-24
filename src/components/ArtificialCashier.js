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
import {
  getSupportedAudioFormat,
  captureAudioFromMicrophone,
  textToSpeech,
  createAssistantSession,
  messageAssistant,
  stripSSMLTags,
} from "../utils/speechUtils";
import AvatarModel from "../assets/models/Avatar.glb";

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
  speechToTextToken,
  speechToTextUrl,
  textToSpeechToken,
  textToSpeechUrl,
  assistantToken,
  assistantUrl,
  dispatchGetSpeechToTextToken,
  dispatchGetTextToSpeechToken,
  dispatchGetAssistantToken,
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
        if (res) {
          await synthesizeTextToSpeech(res);
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
      audio.addEventListener("playing", () => {
        console.log("AUDIO PLAYING!");
        setResponding(true);
        setResponseText(stripSSMLTags(text));
      });
      audio.addEventListener("ended", () => {
        console.log("AUDIO STOPPED PLAYING!");
        setResponding(false);
        setResponseText("");
      });
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
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetSpeechToTextToken: () => dispatch(actions.getSpeechToTextToken()),
  dispatchGetTextToSpeechToken: () => dispatch(actions.getTextToSpeechToken()),
  dispatchGetAssistantToken: () => dispatch(actions.getAssistantToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtificialCashier);
