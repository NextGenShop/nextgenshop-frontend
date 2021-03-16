import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';
import synthesize from 'watson-speech/text-to-speech/synthesize';
import {
  getSupportedAudioFormat,
  captureAudioFromMicrophone,
  textToSpeech,
  createAssistantSession,
  messageAssistant,
  stripSSMLTags,
} from '../speechUtils';

jest.mock('watson-speech/speech-to-text/recognize-microphone', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

jest.mock('watson-speech/text-to-speech/synthesize', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

describe('speechUtils', () => {
  const url = 'mockUrl';
  const token = 'mockToken';

  describe('getSupportedAudioFormat', () => {
    test('should return a format when audioElement not provided', () => {
      const accept = getSupportedAudioFormat();
      expect(accept).toEqual('audio/wav');
    });
    test('should return correct format when audioElement is provided', () => {
      const mockAudioElement = { canPlayType: () => true };
      const accept = getSupportedAudioFormat(mockAudioElement);
      expect(accept).toEqual('audio/mp3');
    });
    test('should return audio/wav format when audioElement is invalid', () => {
      const mockAudioElement = { canPlayType: null };
      const accept = getSupportedAudioFormat(mockAudioElement);
      expect(accept).toEqual('audio/wav');
    });
  });

  describe('captureAudioFromMicrophone', () => {
    test('should call function with correct parameters', async () => {
      await captureAudioFromMicrophone(url, token);
      expect(recognizeMic).toBeCalledWith({
        url,
        accessToken: token,
        objectMode: true,
        extractResults: true,
        format: true,
        mediaStream: null,
        keepMicrophone: true,
      });
    });
  });

  describe('textToSpeech', () => {
    test('should call function with correct parameters', async () => {
      const text = 'mockText';
      const voice = 'mockVoice';
      const accept = 'mockAccept';
      const element = {};
      await textToSpeech(url, token, text, voice, accept, element);
      expect(synthesize).toBeCalledWith({
        url,
        accessToken: token,
        text,
        voice,
        accept,
        element,
      });
    });
  });

  describe('createAssistantSession', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });
    test('should return correct session id', async () => {
      fetch.mockResponseOnce(JSON.stringify({ session_id: 0 }));
      const res = await createAssistantSession(url, token);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(res).toEqual(0);
    });
    test('should catch errors correctly', async () => {
      fetch.mockReject(() => Promise.reject('error'));
      const res = await createAssistantSession(url, token);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(res).toEqual(null);
    });
  });

  describe('messageAssistant', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });
    const sessionId = 0;
    const message = 'mockMessage';
    test('should return correct speech', async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          output: {
            generic: [
              {
                response_type: 'text',
                text: 'mockText',
              },
            ],
          },
        })
      );
      const res = await messageAssistant(url, token, sessionId, message);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(res).toBeDefined();
      expect(res.speech.includes('mockText')).toEqual(true);
      expect(res.actions).toEqual([]);
    });
    test('should return correct speech with medium speed for text containing square brackets', async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          output: {
            generic: [
              {
                response_type: 'text',
                text: '[mockText]',
              },
            ],
          },
        })
      );
      const res = await messageAssistant(url, token, sessionId, message);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(res).toBeDefined();
      expect(res.speech.includes('mockText')).toEqual(true);
      expect(res.speech.includes('<prosody rate="medium"')).toEqual(true);
      expect(res.actions).toEqual([]);
    });
    test('should return correct actions', async () => {
      const expectedRes = {
        speech: '<speak version="1.0"></speak>',
        actions: ['mockUserDefined', 'mockUserDefined2'],
      };
      fetch.mockResponseOnce(
        JSON.stringify({
          output: {
            generic: [
              {
                response_type: 'user_defined',
                user_defined: 'mockUserDefined',
              },
              {
                response_type: 'user_defined',
                user_defined: 'mockUserDefined2',
              },
            ],
          },
        })
      );
      const res = await messageAssistant(url, token, sessionId, message);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(res).toEqual(expectedRes);
    });
    test('should return correct speech and actions', async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          output: {
            generic: [
              {
                response_type: 'text',
                text: 'mockText',
              },
              {
                response_type: 'user_defined',
                user_defined: 'mockUserDefined',
              },
            ],
          },
        })
      );
      const res = await messageAssistant(url, token, sessionId, message);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(res).toBeDefined();
      expect(res.speech.includes('mockText')).toEqual(true);
      expect(res.actions).toEqual(['mockUserDefined']);
    });
    test('should catch errors correctly', async () => {
      const expectedRes = { speech: '', actions: [] };
      fetch.mockReject(() => Promise.reject('error'));
      const res = await messageAssistant(url, token, sessionId, message);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(res).toEqual(expectedRes);
    });
  });

  describe('stripSSMLTags', () => {
    test('should correctly strip ssml tags', () => {
      const mockText = 'mockText';
      const mockSSMLText = `<speak version="1.0"><prosody rate="medium">${mockText}</prosody></speak>`;
      const res = stripSSMLTags(mockSSMLText);
      expect(res).toEqual(mockText);
    });
    test('should trigger error if provided parameter is not a string', () => {
      const mockStr = () => {};
      const res = stripSSMLTags(mockStr);
      expect(res).toEqual(mockStr);
    });
  });
});
