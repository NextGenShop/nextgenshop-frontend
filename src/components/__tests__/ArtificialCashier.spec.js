import React from 'react';
import { shallow } from 'enzyme';
import { ArtificialCashier } from '../ArtificialCashier';

describe('ArtificialCashier', () => {
  test('should correctly render', () => {
    const component = shallow(<ArtificialCashier />);
    expect(component).toMatchSnapshot();
  });
});
