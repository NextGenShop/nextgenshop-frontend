import React from 'react';
import { shallow } from 'enzyme';
import { ArtificialCashier } from '../ArtificialCashier';
import mockBasketItems from '../../store/mock/MockBasketItems.json';
import mockProducts from '../../store/mock/MockSupermarketDataset.json';
import mockUsers from '../../store/mock/MockUsers.json';

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
    dispatchGetSpeechToTextToken: () => {},
    dispatchGetTextToSpeechToken: () => {},
    dispatchGetAssistantToken: () => {},
    dispatchUpdateBasket: () => {},
    dispatchGetProducts: () => {},
    history: () => {},
  };

  beforeEach(() => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  });

  test('should correctly render with props', () => {
    const component = shallow(<ArtificialCashier {...defaultProps} />);
    expect(component).toMatchSnapshot();
  });

  test('should correctly fetch tokens', () => {
    let mockSpeechToTextToken = '';
    let mockSpeechToTextUrl = '';
    let mockTextToSpeechToken = '';
    let mockTextToSpeechUrl = '';
    let mockAssistantToken = '';
    let mockAssistantUrl = '';

    const mockGetSpeechToTextToken = jest.fn(() => {
      mockSpeechToTextToken = 'mockToken';
      mockSpeechToTextUrl = 'mockUrl';
    });

    const mockGetTextToSpeechToken = jest.fn(() => {
      mockTextToSpeechToken = 'mockToken';
      mockTextToSpeechUrl = 'mockUrl';
    });

    const mockGetAssistantToken = jest.fn(() => {
      mockAssistantToken = 'mockToken';
      mockAssistantUrl = 'mockUrl';
    });

    shallow(
      <ArtificialCashier
        speechToTextToken={mockSpeechToTextToken}
        speechToTextUrl={mockSpeechToTextUrl}
        textToSpeechToken={mockTextToSpeechToken}
        textToSpeechUrl={mockTextToSpeechUrl}
        assistantToken={mockAssistantToken}
        assistantUrl={mockAssistantUrl}
        dispatchGetSpeechToTextToken={mockGetSpeechToTextToken}
        dispatchGetTextToSpeechToken={mockGetTextToSpeechToken}
        dispatchGetAssistantToken={mockGetAssistantToken}
      />
    );

    expect(mockGetSpeechToTextToken).toBeCalledTimes(1);
    expect(mockGetTextToSpeechToken).toBeCalledTimes(1);
    expect(mockGetAssistantToken).toBeCalledTimes(1);
  });
});
