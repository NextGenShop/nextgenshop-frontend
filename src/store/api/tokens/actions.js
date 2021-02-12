import * as types from './types';

const baseUrl = '/tokens';

export const getSpeechToTextToken = () => (dispatch) => {
  dispatch({
    type: 'API',
    name: types.GET_SPEECH_TO_TEXT_TOKEN,
    url: `${baseUrl}/speech-to-text`,
    requestData: {
      method: 'GET',
    },
  });
};
export const getTextToSpeechToken = () => (dispatch) => {
  dispatch({
    type: 'API',
    name: types.GET_TEXT_TO_SPEECH_TOKEN,
    url: `${baseUrl}/text-to-speech`,
    requestData: {
      method: 'GET',
    },
  });
};
