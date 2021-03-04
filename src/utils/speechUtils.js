import recognizeMic from "watson-speech/speech-to-text/recognize-microphone";
import synthesize from "watson-speech/text-to-speech/synthesize";

//audio/wav is supported in Chrome, Edge, Firefox (v3.5), Opera (v11.00), Safari (v3.1)
//audio/mp3 is supported in Chrome, IE9, Edge, Firefox (v71), Opera, Safari (v3.1)
//ref: https://en.wikipedia.org/wiki/HTML5_audio

export const getSupportedAudioFormat = (audioElement) => {
  if (!audioElement) {
    audioElement = document.createElement("audio");
  }

  let accept =
    audioElement &&
    audioElement.canPlayType === "function" &&
    audioElement.canPlayType("audio/mp3") !== ""
      ? "audio/mp3"
      : "audio/wav";

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
      method: "post",
      headers: new Headers({
        Authorization: "Bearer " + assistantToken,
        "Content-Type": "application/json",
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
  let data = { speech: "", action: null };
  try {
    res = await fetch(
      `${assistantUrl}/sessions/${sessionId}/message?version=2020-04-01`,
      {
        method: "post",
        headers: new Headers({
          Authorization: "Bearer " + assistantToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ input: { text: message } }),
      }
    );
    res = await res.json();
    console.log(res);
    data.speech =
      '<speak version="1.0"><prosody rate="+15%">' +
      res.output.generic
        .reduce((acc, obj) => {
          if (obj.response_type === "text") {
            acc.push(obj.text);
          }
          return acc;
        }, [])
        .join(' <break strength="medium"></break>') +
      "</prosody></speak>";
    const actions = res.output.generic.reduce((acc, obj) => {
      if (obj.response_type === "user_defined") {
        if (obj.user_defined.quantity) {
          obj.user_defined.action_type = "add_basket";
        } else {
          obj.user_defined.action_type = "filter_product";
        }
        acc.push(obj.user_defined);
      }
      return acc;
    }, []);
    data.action = actions[0];
  } catch (err) {
    console.log(err);
  }
  console.log(data);
  return data;
};

export const stripSSMLTags = (str) => {
  const regex = /(<([^>]+)>)/gi;
  try {
    str = str.replace(regex, "");
  } catch (err) {
    console.log(err);
  }
  return str;
};
