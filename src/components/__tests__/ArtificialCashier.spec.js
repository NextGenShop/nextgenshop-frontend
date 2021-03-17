import React from 'react';
import { shallow } from 'enzyme';
import { ArtificialCashier, mapDispatchToProps } from '../ArtificialCashier';
import mockBasketItems from '../../store/mock/MockBasketItems.json';
import mockProducts from '../../store/mock/MockSupermarketDataset.json';
import mockUsers from '../../store/mock/MockUsers.json';
import * as speechUtils from '../../utils/speechUtils';
import { displayToast } from '../../utils/displayToast';

jest.mock('../../store/api/tokens', () => {
  return {
    ...jest.requireActual('../../store/api/tokens'),
    actions: {
      getSpeechToTextToken: () => 'GET_SPEECH_TO_TEXT_TOKEN',
      getTextToSpeechToken: () => 'GET_TEXT_TO_SPEECH_TOKEN',
      getAssistantToken: () => 'GET_ASSISTANT_TOKEN',
    },
  };
});

jest.mock('../../store/api/basket', () => {
  return {
    ...jest.requireActual('../../store/api/basket'),
    actions: {
      updateBasket: () => 'UPDATE_BASKET',
    },
  };
});

jest.mock('../../store/api/product', () => {
  return {
    ...jest.requireActual('../../store/api/product'),
    actions: {
      getProducts: () => 'GET_PRODUCTS',
    },
  };
});

jest.mock('../../utils/displayToast', () => {
  return {
    displayToast: jest.fn(),
  };
});

describe('ArtificialCashier', () => {
  const defaultProps = {
    authUser: mockUsers[0],
    basket: { items: mockBasketItems, totalPrice: 0, shopper: 0 },
    products: mockProducts,
    speechToTextToken: '',
    speechToTextUrl: '',
    textToSpeechToken: '',
    textToSpeechUrl: '',
    assistantToken: '',
    assistantUrl: '',
    dispatchGetSpeechToTextToken: jest.fn(),
    dispatchGetTextToSpeechToken: jest.fn(),
    dispatchGetAssistantToken: jest.fn(),
    dispatchUpdateBasket: jest.fn(),
    dispatchGetProducts: jest.fn(),
    history: { push: jest.fn() },
  };

  const loadedProps = {
    ...defaultProps,
    speechToTextToken: 'mockSpeechToTextToken',
    speechToTextUrl: 'mockSpeechToTextUrl',
    textToSpeechToken: 'mockTextToSpeechToken',
    textToSpeechUrl: 'mockTextToSpeechUrl',
    assistantToken: 'mockAssistantToken',
    assistantUrl: 'mockAssistantUrl',
  };

  const flushPromises = () => new Promise(setImmediate);
  const realUseState = React.useState;
  const reactMock = require('react');

  const mockUseState = (loaded = false) => {
    reactMock.useState = jest
      .fn()
      .mockImplementationOnce(() => realUseState(loaded)) //loaded
      .mockImplementationOnce(() => realUseState(false)) //listening
      .mockImplementationOnce(() => realUseState(false)) //responding
      .mockImplementationOnce(() => realUseState(null)) //stream
      .mockImplementationOnce(() => realUseState('')) //speechText
      .mockImplementationOnce(() => realUseState('')) //responseText
      .mockImplementationOnce(() => realUseState(loaded ? 'mockSessionId' : '')) //assistantSessionId
      .mockImplementationOnce(() => realUseState(false)) //redirectCheckout
      .mockImplementationOnce(() => realUseState(0)); //voiceIndex
  };

  beforeEach(() => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    jest
      .spyOn(speechUtils, 'getSupportedAudioFormat')
      .mockImplementation(() => 'audio/wav');
    jest
      .spyOn(speechUtils, 'captureAudioFromMicrophone')
      .mockImplementation(() =>
        Promise.resolve({
          on: (str, fn) => {
            const mockData = {
              final: true,
              alternatives: [{ transcript: 'mockSpeechText' }],
            };
            if (str === 'data') fn(mockData);
          },
          stop: () => {},
        })
      );
    jest.spyOn(speechUtils, 'textToSpeech').mockImplementation(() =>
      Promise.resolve({
        addEventListener: () => {},
        removeEventListener: () => {},
      })
    );
    jest
      .spyOn(speechUtils, 'createAssistantSession')
      .mockImplementation(() => 'mockSessionId');
    jest
      .spyOn(speechUtils, 'messageAssistant')
      .mockImplementation(() => Promise.resolve({ speech: '', actions: [] }));
    jest.spyOn(speechUtils, 'stripSSMLTags').mockImplementation((str) => str);
  });

  test('should correctly render with props', () => {
    const component = shallow(<ArtificialCashier {...defaultProps} />);
    expect(component).toMatchSnapshot();
  });

  test('should correctly fetch tokens', () => {
    shallow(<ArtificialCashier {...defaultProps} />);

    expect(defaultProps.dispatchGetSpeechToTextToken).toBeCalledTimes(1);
    expect(defaultProps.dispatchGetTextToSpeechToken).toBeCalledTimes(1);
    expect(defaultProps.dispatchGetAssistantToken).toBeCalledTimes(1);
  });

  test('should render avatar model when loaded', () => {
    mockUseState(true);
    const component = shallow(<ArtificialCashier {...defaultProps} />);
    expect(component.exists('model-viewer')).toEqual(true);
    expect(component.exists('#loadingText')).toEqual(false);
  });

  test('should render loading text when loading', () => {
    mockUseState(false);
    const component = shallow(<ArtificialCashier {...defaultProps} />);
    expect(component.exists('model-viewer')).toEqual(false);
    expect(component.exists('#loadingText')).toEqual(true);
  });

  test('should correctly handle start listening', async () => {
    mockUseState(true);
    const component = shallow(<ArtificialCashier {...loadedProps} />);
    expect(component.find('#listenText').first().text()).toEqual(
      'Press the mic icon and start speaking'
    );
    expect(component.exists('#startListenButton')).toEqual(true);
    reactMock.useState = realUseState; // reset mocked useState to realUseState
    component.find('#startListenButton').first().simulate('click');
    expect(component.find('#listenText').first().text()).toEqual(
      'Listening...'
    );
    await flushPromises(); //waits for promises to resolve
    component.update(); //forces component to re-render
    expect(speechUtils.captureAudioFromMicrophone).toBeCalledWith(
      'mockSpeechToTextUrl',
      'mockSpeechToTextToken'
    );
    expect(speechUtils.messageAssistant).toBeCalledWith(
      'mockAssistantUrl',
      'mockAssistantToken',
      'mockSessionId',
      'mockSpeechText'
    );
    expect(speechUtils.textToSpeech).not.toBeCalled();
  });

  test('should correctly handle stop listening', () => {
    mockUseState(true);
    const component = shallow(<ArtificialCashier {...loadedProps} />);
    expect(component.find('#listenText').first().text()).toEqual(
      'Press the mic icon and start speaking'
    );
    expect(component.exists('#startListenButton')).toEqual(true);
    reactMock.useState = realUseState;
    component.find('#startListenButton').first().simulate('click');
    expect(component.find('#listenText').first().text()).toEqual(
      'Listening...'
    );
    expect(component.exists('#stopListenButton')).toEqual(true);
    component.find('#stopListenButton').first().simulate('click');
    expect(component.find('#listenText').first().text()).toEqual(
      'Press the mic icon and start speaking'
    );
  });

  test('should correctly call text to speech', async () => {
    mockUseState(true);
    jest
      .spyOn(speechUtils, 'messageAssistant')
      .mockImplementation(() =>
        Promise.resolve({ speech: 'mockSpeechText', actions: [] })
      );
    const component = shallow(<ArtificialCashier {...loadedProps} />);
    expect(component.exists('#startListenButton')).toEqual(true);
    reactMock.useState = realUseState;
    component.find('#startListenButton').first().simulate('click');
    await flushPromises();
    component.update();
    expect(speechUtils.textToSpeech).toBeCalled();
  });

  test('should correctly handle add_basket action', async () => {
    mockUseState(true);
    jest.spyOn(speechUtils, 'messageAssistant').mockImplementation(() =>
      Promise.resolve({
        speech: '',
        actions: [
          {
            action_type: 'add_basket',
            product_id: mockProducts[0].productId,
            quantity: 1,
          },
        ],
      })
    );
    const component = shallow(<ArtificialCashier {...loadedProps} />);
    expect(component.exists('#startListenButton')).toEqual(true);
    reactMock.useState = realUseState;
    component.find('#startListenButton').first().simulate('click');
    await flushPromises();
    component.update();
    expect(defaultProps.dispatchUpdateBasket).toBeCalled();
    expect(displayToast).toBeCalled();
  });

  test('should correctly handle filter_product action', async () => {
    mockUseState(true);
    jest.spyOn(speechUtils, 'messageAssistant').mockImplementation(() =>
      Promise.resolve({
        speech: '',
        actions: [
          {
            action_type: 'filter_product',
            product_query_string: 'mockQueryString',
          },
        ],
      })
    );
    const component = shallow(<ArtificialCashier {...loadedProps} />);
    expect(component.exists('#startListenButton')).toEqual(true);
    reactMock.useState = realUseState;
    component.find('#startListenButton').first().simulate('click');
    await flushPromises();
    component.update();
    expect(defaultProps.dispatchGetProducts).toBeCalled();
    expect(displayToast).toBeCalled();
  });

  test('should correctly handle reset_context action', async () => {
    mockUseState(true);
    jest.spyOn(speechUtils, 'messageAssistant').mockImplementation(() =>
      Promise.resolve({
        speech: '',
        actions: [
          {
            action_type: 'reset_context',
          },
        ],
      })
    );
    const component = shallow(<ArtificialCashier {...loadedProps} />);
    expect(component.exists('#startListenButton')).toEqual(true);
    reactMock.useState = realUseState;
    component.find('#startListenButton').first().simulate('click');
    await flushPromises();
    component.update();
    expect(defaultProps.dispatchGetProducts).toBeCalledWith(
      null,
      'Mock Retailer',
      9
    );
  });

  test('should correctly handle checkout action', async () => {
    mockUseState(true);
    jest.spyOn(speechUtils, 'messageAssistant').mockImplementation(() =>
      Promise.resolve({
        speech: '',
        actions: [
          {
            action_type: 'checkout',
          },
        ],
      })
    );
    const component = shallow(<ArtificialCashier {...loadedProps} />);
    expect(component.exists('#startListenButton')).toEqual(true);
    reactMock.useState = realUseState;
    component.find('#startListenButton').first().simulate('click');
    await flushPromises();
    component.update();
    expect(defaultProps.history.push).toBeCalledWith({
      pathname: '/checkout',
    });
  });

  test('should ignore invalid actions', async () => {
    mockUseState(true);
    jest.spyOn(speechUtils, 'messageAssistant').mockImplementation(() =>
      Promise.resolve({
        speech: '',
        actions: [
          {
            action_type: 'invalidActionType',
          },
          {
            action_type: 'invalidActionTypeB',
          },
        ],
      })
    );
    const component = shallow(<ArtificialCashier {...loadedProps} />);
    expect(component.exists('#startListenButton')).toEqual(true);
    reactMock.useState = realUseState;
    component.find('#startListenButton').first().simulate('click');
    await flushPromises();
    component.update();
    expect(defaultProps.dispatchGetProducts).not.toBeCalled();
  });

  test('should dispatch correct actions', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).dispatchGetSpeechToTextToken();
    mapDispatchToProps(dispatch).dispatchGetTextToSpeechToken();
    mapDispatchToProps(dispatch).dispatchGetAssistantToken();
    mapDispatchToProps(dispatch).dispatchUpdateBasket();
    mapDispatchToProps(dispatch).dispatchGetProducts();
    expect(dispatch.mock.calls[0][0]).toEqual('GET_SPEECH_TO_TEXT_TOKEN');
    expect(dispatch.mock.calls[1][0]).toBe('GET_TEXT_TO_SPEECH_TOKEN');
    expect(dispatch.mock.calls[2][0]).toBe('GET_ASSISTANT_TOKEN');
    expect(dispatch.mock.calls[3][0]).toBe('UPDATE_BASKET');
    expect(dispatch.mock.calls[4][0]).toBe('GET_PRODUCTS');
  });
});
