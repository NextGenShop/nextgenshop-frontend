import axios from 'axios';
import apiMiddleware from '../apiMiddleware';
import { types as authTypes } from '../../store/api/auth';
import { types as basketTypes } from '../../store/api/basket';
import { types as productTypes } from '../../store/api/product';
import mockUsers from '../../store/mock/MockUsers.json';

jest.mock('axios');

describe('apiMiddleware', () => {
  let mockAction, mockNext, mockStore;
  beforeEach(() => {
    mockAction = {
      type: 'API',
      requestData: {
        headers: { authorization: `Token ${mockUsers[0].token}` },
      },
    };
    mockNext = jest.fn();
    mockStore = { dispatch: jest.fn() };
  });

  test('should not call dispatch if action type is not API', () => {
    const mockNonAPIAction = {
      type: 'MOCK_ACTION',
    };
    apiMiddleware(mockStore)(mockNext)(mockNonAPIAction);
    expect(mockNext).toBeCalledTimes(1);
    expect(mockStore.dispatch).not.toBeCalled();
  });

  test('should use mock API dispatch for GET_USER action', () => {
    mockAction.name = authTypes.GET_USER;
    apiMiddleware(mockStore)(mockNext)(mockAction);
    expect(mockStore.dispatch).toBeCalledWith({
      type: `${mockAction.name}_SUCCESS`,
      response: mockUsers[0],
    });
  });

  test('should use mock API dispatch for LOGIN action', () => {
    mockAction.requestData.headers = null;
    mockAction.requestData.data = {
      email: mockUsers[0].email,
      password: mockUsers[0].password,
    };
    mockAction.name = authTypes.LOGIN;
    apiMiddleware(mockStore)(mockNext)(mockAction);
    expect(mockStore.dispatch).toBeCalledWith({
      type: `${mockAction.name}_SUCCESS`,
      response: { user: mockUsers[0], token: mockUsers[0].token },
    });
  });

  test('should use axios for GET_PRODUCTS action', async () => {
    const mockUrl = '/product';
    mockAction.url = mockUrl;
    mockAction.requestData.method = 'GET';
    mockAction.name = productTypes.GET_PRODUCTS;
    mockAction.requestData.params = {
      query: 'mockQuery',
      retailer: 'mockRetailer',
      limit: 9,
    };
    const mockData = [];
    axios.request.mockResolvedValue({ data: mockData });
    await apiMiddleware(mockStore)(mockNext)(mockAction);
    expect(mockStore.dispatch).toBeCalledTimes(2);
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1, {
      type: `${mockAction.name}_REQUEST`,
    });
    expect(axios.request).toHaveBeenCalledWith({
      url: mockUrl,
      method: 'GET',
      headers: mockAction.requestData.headers,
      params: mockAction.requestData.params,
    });
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(2, {
      type: `${mockAction.name}_SUCCESS`,
      response: mockData,
    });
  });

  test('should use axios for GET_BASKET action', async () => {
    const mockUrl = '/basket';
    mockAction.url = mockUrl;
    mockAction.requestData.method = 'GET';
    mockAction.name = basketTypes.GET_BASKET;
    const mockData = { items: [] };
    axios.request.mockResolvedValue({ data: mockData });
    await apiMiddleware(mockStore)(mockNext)(mockAction);
    expect(mockStore.dispatch).toBeCalledTimes(2);
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1, {
      type: `${mockAction.name}_REQUEST`,
    });
    expect(axios.request).toHaveBeenCalledWith({
      url: mockUrl,
      method: 'GET',
      headers: mockAction.requestData.headers,
    });
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(2, {
      type: `${mockAction.name}_SUCCESS`,
      response: mockData,
    });
  });

  test('should dispatch FAILURE if error catched on axios request', async () => {
    const mockUrl = '/basket';
    mockAction.url = mockUrl;
    mockAction.requestData.method = 'GET';
    mockAction.name = basketTypes.GET_BASKET;
    const mockError = { response: { data: { error: 'mockError' } } };
    axios.request.mockRejectedValueOnce(mockError);
    await apiMiddleware(mockStore)(mockNext)(mockAction);
    expect(mockStore.dispatch).toBeCalledTimes(2);
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1, {
      type: `${mockAction.name}_REQUEST`,
    });
    expect(axios.request).toHaveBeenCalledWith({
      url: mockUrl,
      method: 'GET',
      headers: mockAction.requestData.headers,
    });
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(2, {
      type: `${mockAction.name}_FAILURE`,
      error: mockError.response.data.error,
    });
  });

  test('should return unknown error when axios request catches error', async () => {
    const mockUrl = '/basket';
    mockAction.url = mockUrl;
    mockAction.requestData.method = 'GET';
    mockAction.name = basketTypes.GET_BASKET;
    const mockError = { response: null };
    axios.request.mockRejectedValueOnce(mockError);
    await apiMiddleware(mockStore)(mockNext)(mockAction);
    expect(mockStore.dispatch).toBeCalledTimes(2);
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1, {
      type: `${mockAction.name}_REQUEST`,
    });
    expect(axios.request).toHaveBeenCalledWith({
      url: mockUrl,
      method: 'GET',
      headers: mockAction.requestData.headers,
    });
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(2, {
      type: `${mockAction.name}_FAILURE`,
      error: 'An unknown error has occurred',
    });
  });
});
