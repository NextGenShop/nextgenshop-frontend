import React from 'react';
import { shallow } from 'enzyme';
import { Checkout } from '../CheckoutPage';
import mockBasketItems from '../../../store/mock/MockBasketItems.json';

describe('CheckoutPage', () => {
  test('should correctly render', () => {
    const component = shallow(<Checkout />);
    expect(component).toMatchSnapshot();
  });
  test('should correctly render with props', () => {
    const mockBasket = { items: mockBasketItems, totalPrice: 0, shopper: 0 };
    const component = shallow(<Checkout basket={mockBasket} />);
    expect(component).toMatchSnapshot();
  });
});
