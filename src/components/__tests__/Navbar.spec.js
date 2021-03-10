import React from 'react';
import { shallow } from 'enzyme';
import { Navbar } from '../Navbar';

describe('Navbar', () => {
  test('should correctly render', () => {
    const component = shallow(<Navbar />);
    expect(component).toMatchSnapshot();
  });
});
