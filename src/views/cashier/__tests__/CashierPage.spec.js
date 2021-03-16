import React from 'react';
import { shallow } from 'enzyme';
import CashierPage from '../CashierPage';

describe('CashierPage', () => {
  test('should correctly render', () => {
    const component = shallow(<CashierPage />);
    expect(component).toMatchSnapshot();
  });
});
