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
    typeof audioElement.canPlayType === 'function' &&
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
    console.log('Could not find media devices');
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

export const textToSpeech = async (
  textToSpeechUrl,
  textToSpeechToken,
  text,
  voice,
  accept,
  element
) => {
  return synthesize({
    url: textToSpeechUrl,
    accessToken: textToSpeechToken,
    text,
    voice,
    accept,
    element,
  });
};

export const createAssistantSession = async (assistantUrl, assistantToken) => {
  let session;
  try {
    const res = await fetch(`${assistantUrl}/sessions?version=2020-04-01`, {
      method: 'post',
      headers: new Headers({
        Authorization: 'Bearer ' + assistantToken,
        'Content-Type': 'application/json',
      }),
    });
    session = await res.json();
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
  let res;
  let data = { speech: '', actions: [] };
  try {
    res = await fetch(
      `${assistantUrl}/sessions/${sessionId}/message?version=2020-04-01`,
      {
        method: 'post',
        headers: new Headers({
          Authorization: 'Bearer ' + assistantToken,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ input: { text: message } }),
      }
    );
    res = await res.json();
    data.speech =
      '<speak version="1.0">' +
      res.output.generic
        .reduce((acc, obj) => {
          if (obj.response_type === 'text') {
            if (obj.text.includes('[')) {
              acc.push(
                '<prosody rate="medium">' +
                  obj.text
                    .trim()
                    .replace(/['"\[\]]+/g, '')
                    .replace(/,/g, ', ') +
                  '</prosody>'
              );
            } else {
              acc.push(
                '<prosody rate="+10%">' + obj.text.trim() + '</prosody>'
              );
            }
          }
          return acc;
        }, [])
        .join(' <break strength="medium"></break>') +
      '</speak>';
    const actions = res.output.generic.reduce((acc, obj) => {
      if (obj.response_type === 'user_defined') {
        acc.push(obj.user_defined);
      }
      return acc;
    }, []);
    data.actions = actions;
  } catch (err) {
    console.log(err);
  }
  return data;
};

export const stripSSMLTags = (str) => {
  const regex = /(<([^>]+)>)/gi;
  try {
    str = str.replace(regex, '');
  } catch (err) {
    console.log(err);
  }
  return str;
};
