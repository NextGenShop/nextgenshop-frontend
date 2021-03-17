import React from 'react';
import { shallow } from 'enzyme';
import { Basket, mapDispatchToProps } from '../Basket';
import mockBasketItems from '../../store/mock/MockBasketItems.json';

jest.mock('../../store/api/basket', () => {
  return {
    ...jest.requireActual('../../store/api/basket'),
    actions: {
      getBasket: () => 'GET_BASKET',
      updateBasket: () => 'UPDATE_BASKET',
    },
  };
});

describe('Basket', () => {
  const defaultProps = {
    shopperId: 'mockId',
    dispatchUpdateBasket: jest.fn(),
    dispatchGetBasket: jest.fn(),
    basket: null,
  };

  test('should correctly render', () => {
    const component = shallow(<Basket />);
    expect(component).toMatchSnapshot();
  });

  test('should correctly render with props', () => {
    const component = shallow(<Basket {...defaultProps} />);
    expect(component).toMatchSnapshot();
  });

  test('should correctly render a single basket item', () => {
    const mockBasket = {
      items: [mockBasketItems[0], mockBasketItems[1]],
      totalPrice: 0,
    };
    const component = shallow(<Basket {...defaultProps} basket={mockBasket} />);
    expect(component).toMatchSnapshot();
  });

  test('should correctly render multiple basket items', () => {
    const mockBasket = { items: [mockBasketItems[0]], totalPrice: 0 };
    const component = shallow(<Basket {...defaultProps} basket={mockBasket} />);
    expect(component).toMatchSnapshot();
  });

  test('should correctly remove a basket item', () => {
    const mockBasket = {
      items: [mockBasketItems[0]],
      totalPrice: 0,
    };
    const component = shallow(<Basket {...defaultProps} basket={mockBasket} />);
    component.find('[aria-label="deleteButton"]').first().simulate('click');
    expect(defaultProps.dispatchUpdateBasket).toBeCalled();
  });

  test('should dispatch correct actions', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).dispatchGetBasket();
    mapDispatchToProps(dispatch).dispatchUpdateBasket();
    expect(dispatch.mock.calls[0][0]).toEqual('GET_BASKET');
    expect(dispatch.mock.calls[1][0]).toBe('UPDATE_BASKET');
  });
});
