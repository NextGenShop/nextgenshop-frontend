import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import StopIcon from '@material-ui/icons/StopOutlined';
import IconButton from '@material-ui/core/IconButton';
import MicRoundedIcon from '@material-ui/icons/MicRounded';
import VoiceIcon from '@material-ui/icons/RecordVoiceOver';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { actions } from '../store/api/tokens';
import {
  getSupportedAudioFormat,
  captureAudioFromMicrophone,
  textToSpeech,
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
}));

function ArtificialCashier({
  speechToTextToken,
  speechToTextUrl,
  textToSpeechToken,
  textToSpeechUrl,
  dispatchGetSpeechToTextTokens,
  dispatchGetTextToSpeechTokens,
}) {
  const classes = useStyles();
  const [loaded, setLoaded] = React.useState(false);
  const [listening, setListening] = React.useState(false);
  const [stream, setStream] = React.useState(null);
  const [responseText, setResponseText] = React.useState('');
  const audioRef = React.useRef(null);

  const testVoices = [
    'en-GB_JamesV3Voice',
    'en-GB_KateV3Voice',
    'en-GB_CharlotteV3Voice',
  ];
  //ref: https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-voices

  React.useEffect(() => {
    if (!speechToTextToken || !speechToTextUrl) {
      dispatchGetSpeechToTextTokens();
    }
    if (!textToSpeechToken || !textToSpeechUrl) {
      dispatchGetTextToSpeechTokens();
    }
    if (
      !!speechToTextToken &&
      !!speechToTextUrl &&
      !!textToSpeechToken &&
      !!textToSpeechUrl
    ) {
      console.log('Done loading tokens from API');
      setLoaded(true);
    }
  }, [
    dispatchGetSpeechToTextTokens,
    dispatchGetTextToSpeechTokens,
    speechToTextToken,
    speechToTextUrl,
    textToSpeechToken,
    textToSpeechUrl,
  ]);

  const startListening = async () => {
    setListening(true);
    const stream = await captureAudioFromMicrophone(
      speechToTextUrl,
      speechToTextToken
    );
    stream.on('data', (data) => {
      if (data && data.final) {
        setResponseText(data.alternatives[0].transcript);
      }
    });
    stream.on('error', function (err) {
      console.log(err);
      stopListening();
    });
    stream.on('end', function () {
      console.log('stream ended');
      stopListening();
    });
    setStream(stream);
  };

  const stopListening = () => {
    setListening(false);
    if (stream) {
      stream.stop();
      setStream(null);
    }
  };

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
      await audioRef.current.play();
    } catch (err) {
      console.log(err);
    }
  };

  const AudioOutput = () => (
    <audio ref={audioRef}>
      Your browser does not support the <code>audio</code> element.
    </audio>
  );

  const ListenButton = listening ? (
    <IconButton color='secondary' aria-label='stop' onClick={stopListening}>
      <StopIcon fontSize='large' />
    </IconButton>
  ) : (
    <IconButton color='primary' aria-label='speak' onClick={startListening}>
      <MicRoundedIcon fontSize='large' />
    </IconButton>
  );

  return (
    <Paper className={classes.paper}>
      <div className={classes.inner}>
        <Typography variant='h3'>{responseText}</Typography>
        {loaded ? (
          <React.Fragment>
            <Typography variant='subtitle2'>
              {listening
                ? 'Listening...'
                : 'Press the mic icon and start speaking'}
            </Typography>
            {ListenButton}

            <IconButton
              color='primary'
              aria-label='speak'
              onClick={() =>
                synthesizeTextToSpeech('Hello, i am your artificial cashier')
              }
            >
              <VoiceIcon fontSize='large' />
            </IconButton>
            {AudioOutput}
          </React.Fragment>
        ) : (
          <Typography variant='subtitle2'>Loading... Please wait</Typography>
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
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetSpeechToTextTokens: () => dispatch(actions.getSpeechToTextToken()),
  dispatchGetTextToSpeechTokens: () => dispatch(actions.getTextToSpeechToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtificialCashier);
