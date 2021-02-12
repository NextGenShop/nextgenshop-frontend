import authHeader from '../../../utils/authHeader';
import * as types from './types';

const baseUrl = '/basket';

export const updateBasket = (shopperId, basket) => (dispatch, getState) => {
  dispatch({
    type: 'API',
    name: types.UPDATE_BASKET,
    url: `${baseUrl}/${shopperId}`,
    requestData: {
      method: 'PUT',
      headers: authHeader(getState()),
      data: basket,
    },
  });
};

export const getBasket = (shopperId) => (dispatch, getState) => {
  dispatch({
    type: 'API',
    name: types.GET_BASKET,
    url: `${baseUrl}/${shopperId}`,
    requestData: {
      method: 'GET',
      headers: authHeader(getState()),
    },
  });
};

export const deleteBasket = (shopperId) => (dispatch, getState) => {
  dispatch({
    type: 'API',
    name: types.DELETE_BASKET,
    url: `${baseUrl}/${shopperId}`,
    requestData: {
      method: 'DELETE',
      headers: authHeader(getState()),
    },
  });
};

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: `${types.UPDATE_BASKET}_CLEARERR`,
  });
  dispatch({
    type: `${types.GET_BASKET}_CLEARERR`,
  });
  dispatch({
    type: `${types.DELETE_BASKET}_CLEARERR`,
  });
};
