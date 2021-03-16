import mockUsers from './MockUsers.json';
import { types as authTypes } from '../api/auth';
import { types as productTypes } from '../api/product';

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
  } else {
    return false;
  }
  return true;
};

export { handleRequest };
