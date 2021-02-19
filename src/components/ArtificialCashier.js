import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import StopIcon from '@material-ui/icons/StopOutlined';
import IconButton from '@material-ui/core/IconButton';
import MicRoundedIcon from '@material-ui/icons/MicRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { actions } from '../store/api/tokens';
import {
  getSupportedAudioFormat,
  captureAudioFromMicrophone,
  textToSpeech,
  createAssistantSession,
  messageAssistant,
  stripSSMLTags,
} from '../utils/speechUtils';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    color: theme.palette.text.secondary,
    background: '#eeeeee',
    height: '75vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bold: {
    fontWeight: 'bold',
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
  const [stream, setStream] = React.useState(null);
  const [speechText, setSpeechText] = React.useState('');
  const [responseText, setResponseText] = React.useState('');
  const [assistantSessionId, setAssistantSessionId] = React.useState(null);
  const audioRef = React.useRef(null);

  const testVoices = [
    'en-GB_JamesV3Voice',
    'en-GB_KateV3Voice',
    'en-GB_CharlotteV3Voice',
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
      console.log('Done loading tokens from API.');
      console.log('Created assistant session: ' + instanceId);
    }

    if (
      !!speechToTextToken &&
      !!speechToTextUrl &&
      !!textToSpeechToken &&
      !!textToSpeechUrl &&
      !!assistantToken &&
      !!assistantUrl &&
      !assistantSessionId
    ) {
      createSession();
    }
  }, [
    assistantToken,
    assistantUrl,
    speechToTextToken,
    speechToTextUrl,
    textToSpeechToken,
    textToSpeechUrl,
    assistantSessionId,
  ]);

  const startListening = async () => {
    setListening(true);
    const stream = await captureAudioFromMicrophone(
      speechToTextUrl,
      speechToTextToken
    );
    stream.on('data', async (data) => {
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
        setResponseText(stripSSMLTags(res));
        if (res) {
          await synthesizeTextToSpeech(res);
        }
      }
    });
    stream.on('error', function (err) {
      console.log(err);
      setListening(false);
    });
    stream.on('end', function () {
      console.log('stream ended');
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
      const audio = textToSpeech(
        textToSpeechUrl,
        textToSpeechToken,
        text,
        voice,
        accept
      );
      audioRef.current.setAttribute('src', audio.src);
    } catch (err) {
      console.log(err);
    }
  };

  const ListenButton = listening ? (
    <IconButton
      color='secondary'
      aria-label='stop'
      onClick={() => setListening(false)}
    >
      <StopIcon fontSize='large' />
    </IconButton>
  ) : (
    <IconButton color='primary' aria-label='speak' onClick={startListening}>
      <MicRoundedIcon fontSize='large' />
    </IconButton>
  );

  return (
    <Paper className={classes.paper}>
      <audio ref={audioRef}>
        Your browser does not support the <code>audio</code> element.
      </audio>
      <div className={classes.inner}>
        {speechText && (
          <Typography variant='h6'>
            <span className={classes.bold}>Speech:</span> {speechText}
          </Typography>
        )}
        {responseText && (
          <Typography variant='h6'>
            <span className={classes.bold}>Response:</span> {responseText}
          </Typography>
        )}
        {loaded ? (
          <React.Fragment>
            <br />
            <Typography variant='subtitle2'>
              {listening
                ? 'Listening...'
                : 'Press the mic icon and start speaking'}
            </Typography>
            {ListenButton}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography variant='subtitle2' gutterBottom>
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
