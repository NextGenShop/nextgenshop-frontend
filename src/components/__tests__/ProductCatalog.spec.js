import React from 'react';
import { shallow } from 'enzyme';
import { ProductCatalog } from '../ProductCatalog';

describe('ProductCatalog', () => {
  test('should correctly render', () => {
    const component = shallow(<ProductCatalog />);
    expect(component).toMatchSnapshot();
  });
  test('should correctly render with props', () => {
    const component = shallow(
      <ProductCatalog
        retailer='mockRetailer'
        searchQuery='mockQuery'
        limit={9}
        shopperId='mockId'
      />
    );
    expect(component).toMatchSnapshot();
  });
});
