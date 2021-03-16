import React from 'react';
import { shallow } from 'enzyme';
import { Main } from '../Main';
import CashierMain from '../cashier/CashierPage';
import ShopperMain from '../shopper/ShopperPage';

jest.mock('../cashier/CashierPage');
jest.mock('../shopper/ShopperPage');

describe('Main', () => {
  const mockShopper = { type: 'shopper' };
  const mockCashier = { type: 'cashier' };
  test('should correctly render', () => {
    const component = shallow(<Main />);
    expect(component).toMatchSnapshot();
  });
  test('should correctly render with props', () => {
    const props = {
      auth: { user: mockShopper, isAuthenticated: false },
    };
    const component = shallow(<Main {...props} />);
    expect(component).toMatchSnapshot();
  });
  test('should correctly render shopper main', () => {
    const props = {
      auth: { user: mockShopper, isAuthenticated: true },
    };
    const component = shallow(<Main {...props} />);
    expect(component.find(ShopperMain)).toHaveLength(1);
  });
  test('should correctly render cashier main', () => {
    const props = {
      auth: { user: mockCashier, isAuthenticated: true },
    };
    const component = shallow(<Main {...props} />);
    expect(component.find(CashierMain)).toHaveLength(1);
  });
});
