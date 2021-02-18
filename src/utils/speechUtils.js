import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';
import synthesize from 'watson-speech/text-to-speech/synthesize';

//audio/wav is supported in Chrome, Edge, Firefox (v3.5), Opera (v11.00), Safari (v3.1)
//audio/mp3 is supported in Chrome, IE9, Edge, Firefox (v71), Opera, Safari (v3.1)
//ref: https://en.wikipedia.org/wiki/HTML5_audio

export const getSupportedAudioFormat = (audioElement) => {
  if (!audioElement) {
    audioElement = document.createElement('audio');
  }

  let accept =
    audioElement &&
    audioElement.canPlayType === 'function' &&
    audioElement.canPlayType('audio/mp3') !== ''
      ? 'audio/mp3'
      : 'audio/wav';

  return accept;
};

export const captureAudioFromMicrophone = async (
  speechToTextUrl,
  speechToTextToken
) => {
  let mediaStream = null;
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });
  } catch (err) {
    console.log(err);
  }

  const recognizeMicrophoneStream = recognizeMic({
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

export const textToSpeech = (
  textToSpeechUrl,
  textToSpeechToken,
  text,
  voice,
  accept
) => {
  return synthesize({
    url: textToSpeechUrl,
    accessToken: textToSpeechToken,
    text,
    voice,
    accept,
  });
};

export const createAssistantSession = async (assistantUrl, assistantToken) => {
  let session;
  try {
    session = await fetch(`${assistantUrl}/sessions?version=2020-04-01`, {
      method: 'post',
      headers: new Headers({
        Authorization: 'Bearer ' + assistantToken,
        'Content-Type': 'application/json',
      }),
    });
  } catch (err) {
    console.log(err);
  }
  return session ? session.session_id : null;
};

export const messageAssistant = async (
  assistantUrl,
  assistantToken,
  sessionId,
  message
) => {
  let response;
  try {
    response = await fetch(`${assistantUrl}/sessions/${sessionId}/message`, {
      method: 'post',
      headers: new Headers({
        Authorization: 'Bearer ' + assistantToken,
        'Content-Type': 'application/json',
      }),
      body: { input: { text: message } },
    });
  } catch (err) {
    console.log(err);
  }
  return response ? response.output.generic[0].text : null;
};
