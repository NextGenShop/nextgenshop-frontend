import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import StopIcon from '@material-ui/icons/StopOutlined';
import IconButton from '@material-ui/core/IconButton';
import MicRoundedIcon from '@material-ui/icons/MicRounded';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { actions } from '../store/api/tokens';
import recognizeMicrophone from 'watson-speech/speech-to-text/recognize-microphone';

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

  const captureAudioFromMicrophone = async () => {
    let mediaStream = null;
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
    } catch (err) {
      console.log(err);
    }

    const recognizeMicrophoneStream = recognizeMicrophone({
      url: speechToTextUrl,
      accessToken: speechToTextToken,
      objectMode: true,
      extractResults: true,
      format: true,
      mediaStream,
      keepMicrophone: true,
    });

    return recognizeMicrophoneStream;
  };

  const startListening = async () => {
    setListening(true);
    const stream = await captureAudioFromMicrophone();
    stream.on('data', (data) => {
      setResponseText(data.alternatives[0].transcript);
    });
    stream.on('error', function (err) {
      console.log(err);
      stopListening();
    });
    stream.on('end', function () {
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
