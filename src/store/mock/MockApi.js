import mockUsers from './MockUsers.json';
import mockProducts from './MockSupermarketDataset.json';
import { calcTotalPrice } from '../../utils/basketUtils';
import { types as authTypes } from '../api/auth';
import { types as productTypes } from '../api/product';
import { types as basketTypes } from '../api/basket';

let mockBasket = localStorage.getItem('basket')
  ? JSON.parse(localStorage.getItem('basket'))
  : {
      basketId: 0,
      items: [],
      totalPrice: 0,
      shopper: 0,
    };

const handleRequest = (dispatch, name, req) => {
  let res = {};
  if (name === authTypes.GET_USER) {
    const token = req.headers.authorization.split(' ')[1];
    res = mockUsers.find((user) => user.token === token);
    if (res) {
      dispatch({ type: `${name}_SUCCESS`, response: res });
    } else {
      dispatch({ type: `${name}_FAILURE`, error: 'Invalid token' });
    }
  } else if (name === authTypes.LOGIN) {
    res = mockUsers.find(
      (user) =>
        user.email === req.data.email && user.password === req.data.password
    );
    if (res) {
      dispatch({
        type: `${name}_SUCCESS`,
        response: { user: res, token: res.token },
      });
    } else {
      dispatch({
        type: `${name}_FAILURE`,
        error: 'Incorrect email or password',
      });
    }
  } else if (name === authTypes.LOGOUT) {
    dispatch({ type: `${name}_SUCCESS` });
  } else if (name === productTypes.GET_PRODUCTS) {
    return false;
    // const searchQuery = req.params.query;
    // const searchRetailer = req.params.retailer;
    // const limit = req.params.limit;
    // let products = searchRetailer
    //   ? mockProducts.filter((product) => product.retailer === searchRetailer)
    //   : mockProducts;
    // products = searchQuery
    //   ? products.filter(
    //       (product) =>
    //         product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         product.productId.toString() === searchQuery
    //     )
    //   : products;
    // if (limit) products = products.slice(0, Math.min(limit, products.length));
    // dispatch({ type: `${name}_SUCCESS`, response: products });
  } else if (name === basketTypes.UPDATE_BASKET) {
    if (req.data.items) {
      mockBasket.items = req.data.items;
    }
    mockBasket.totalPrice = calcTotalPrice(mockBasket.items);
    localStorage.setItem('basket', JSON.stringify(mockBasket));
    dispatch({ type: `${name}_SUCCESS`, response: mockBasket });
  } else if (name === basketTypes.GET_BASKET) {
    dispatch({ type: `${name}_SUCCESS`, response: mockBasket });
  } else if (name === basketTypes.DELETE_BASKET) {
    mockBasket = {
      basketId: 0,
      items: [],
      totalPrice: 0,
      shopper: 0,
    };
    localStorage.setItem('basket', JSON.stringify(mockBasket));
    dispatch({ type: `${name}_SUCCESS`, response: mockBasket });
  } else {
    return false;
  }
  return true;
};

export { handleRequest };
