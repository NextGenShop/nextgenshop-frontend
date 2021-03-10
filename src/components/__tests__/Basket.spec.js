import React from 'react';
import { shallow } from 'enzyme';
import { Basket } from '../Basket';

describe('Basket', () => {
  test('should correctly render', () => {
    const component = shallow(<Basket />);
    expect(component).toMatchSnapshot();
  });
  test('should correctly render with props', () => {
    const component = shallow(<Basket shopperId='mockId' />);
    expect(component).toMatchSnapshot();
  });
});
