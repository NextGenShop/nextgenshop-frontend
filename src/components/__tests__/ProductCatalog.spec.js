import React from 'react';
import { shallow } from 'enzyme';
import { ProductCatalog, mapDispatchToProps } from '../ProductCatalog';
import mockBasketItems from '../../store/mock/MockBasketItems.json';
import mockProducts from '../../store/mock/MockSupermarketDataset.json';

jest.mock('../../store/api/basket', () => {
  return {
    ...jest.requireActual('../../store/api/basket'),
    actions: {
      updateBasket: () => 'UPDATE_BASKET',
    },
  };
});

jest.mock('../../store/api/product', () => {
  return {
    ...jest.requireActual('../../store/api/product'),
    actions: {
      getProducts: () => 'GET_PRODUCTS',
    },
  };
});

describe('ProductCatalog', () => {
  const defaultProps = {
    searchQuery: 'mockQuery',
    retailer: 'mockRetailer',
    limit: 9,
    tableView: false,
    products: [],
    shopperId: 0,
    dispatchGetProducts: jest.fn(),
    dispatchUpdateBasket: jest.fn(),
    basket: { items: mockBasketItems, totalPrice: 0, shopper: 0 },
  };

  beforeEach(() => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  });

  test('should correctly render with props', () => {
    const component = shallow(<ProductCatalog {...defaultProps} />);
    expect(component).toMatchSnapshot();
  });

  test('should correctly render with products', () => {
    const component = shallow(
      <ProductCatalog
        {...defaultProps}
        products={[mockProducts[0], mockProducts[1]]}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test('should correctly fetch products on render', () => {
    shallow(<ProductCatalog {...defaultProps} />);
    expect(defaultProps.dispatchGetProducts).toBeCalledTimes(1);
  });

  test('should correctly render table view', () => {
    const component = shallow(
      <ProductCatalog {...defaultProps} tableView={true} />
    );
    expect(component).toMatchSnapshot();
  });

  test('should correctly render table view with products', () => {
    const component = shallow(
      <ProductCatalog
        {...defaultProps}
        tableView={true}
        products={[mockProducts[0], mockProducts[1]]}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test('should correctly add a product to basket', () => {
    const component = shallow(
      <ProductCatalog {...defaultProps} products={[mockProducts[0]]} />
    );
    component
      .find('[aria-label="addToBasketButton"]')
      .first()
      .simulate('click');
    expect(defaultProps.dispatchUpdateBasket).toBeCalledTimes(1);
  });

  test('should correctly add a product to basket in table view', () => {
    const component = shallow(
      <ProductCatalog
        {...defaultProps}
        tableView={true}
        products={[mockProducts[0]]}
      />
    );
    component
      .find('[aria-label="addToBasketButton"]')
      .first()
      .simulate('click');
    expect(defaultProps.dispatchUpdateBasket).toBeCalledTimes(1);
  });

  test('should dispatch correct actions', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).dispatchUpdateBasket();
    mapDispatchToProps(dispatch).dispatchGetProducts();
    expect(dispatch.mock.calls[0][0]).toBe('UPDATE_BASKET');
    expect(dispatch.mock.calls[1][0]).toBe('GET_PRODUCTS');
  });
});
