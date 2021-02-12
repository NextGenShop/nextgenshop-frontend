import * as types from './types';

const initialState = {
  speechToTextToken: null,
  speechToTextUrl: null,
  textToSpeechToken: null,
  textToSpeechUrl: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${types.GET_SPEECH_TO_TEXT_TOKEN}_SUCCESS`:
      return {
        ...state,
        speechToTextToken: action.response.accessToken,
        speechToTextUrl: action.response.url,
      };
    case `${types.GET_TEXT_TO_SPEECH_TOKEN}_SUCCESS`:
      return {
        ...state,
        textToSpeechToken: action.response.accessToken,
        textToSpeechUrl: action.response.url,
      };

    default:
      return state;
  }
};

export default reducer;
