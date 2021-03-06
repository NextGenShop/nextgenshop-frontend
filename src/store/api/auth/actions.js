import authHeader from '../../../utils/authHeader';
import * as types from './types';

const baseUrl = '/auth';

export const getUser = () => (dispatch, getState) => {
  dispatch({
    type: 'API',
    name: types.GET_USER,
    url: `${baseUrl}/user/`,
    requestData: {
      method: 'GET',
      headers: authHeader(getState()),
    },
  });
};

export const login = (data) => (dispatch) => {
  dispatch({
    type: 'API',
    name: types.LOGIN,
    url: `${baseUrl}/login/`,
    requestData: {
      method: 'POST',
      data,
    },
  });
};

export const logout = () => async (dispatch, getState) => {
  dispatch({
    type: 'API',
    name: types.LOGOUT,
    url: `${baseUrl}/logout/`,
    requestData: {
      method: 'GET',
      headers: authHeader(getState()),
    },
  });
};

export const register = (data) => (dispatch) => {
  dispatch({
    type: 'API',
    name: types.REGISTER,
    url: `${baseUrl}/register/`,
    requestData: {
      method: 'POST',
      data,
    },
  });
};

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: `${types.LOGIN}_CLEARERR`,
  });
  dispatch({
    type: `${types.REGISTER}_CLEARERR`,
  });
};
