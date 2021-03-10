import React from 'react';
import { shallow } from 'enzyme';
import ProductSearchBox from '../ProductSearchBox';

describe('ProductSearchBox', () => {
  test('should correctly render', () => {
    const component = shallow(<ProductSearchBox />);
    expect(component).toMatchSnapshot();
  });
  test('should correctly render with props', () => {
    const component = shallow(
      <ProductSearchBox value='mockValue' onChange={() => {}} />
    );
    expect(component).toMatchSnapshot();
  });
});
