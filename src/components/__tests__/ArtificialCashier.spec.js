import React from 'react';
import { shallow } from 'enzyme';
import { ArtificialCashier } from '../ArtificialCashier';
import mockBasketItems from '../../store/mock/MockBasketItems.json';
import mockProducts from '../../store/mock/MockSupermarketDataset.json';
import mockUsers from '../../store/mock/MockUsers.json';

describe('ArtificialCashier', () => {
  test('should correctly render', () => {
    const component = shallow(<ArtificialCashier />);
    expect(component).toMatchSnapshot();
  });

  test('should correctly render with props', () => {
    const component = shallow(
      <ArtificialCashier
        authUser={mockUsers[0]}
        basket={{ items: mockBasketItems, totalPrice: 0, shopper: 0 }}
        products={mockProducts}
        speechToTextToken=''
        speechToTextUrl=''
        textToSpeechToken=''
        textToSpeechUrl=''
        assistantToken=''
        assistantUrl=''
        dispatchGetSpeechToTextToken={() => {}}
        dispatchGetTextToSpeechToken={() => {}}
        dispatchGetAssistantToken={() => {}}
        dispatchUpdateBasket={() => {}}
        dispatchGetProducts={() => {}}
        history={() => {}}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
