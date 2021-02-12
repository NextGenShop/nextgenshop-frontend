import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import auth from './api/auth';
import product from './api/product';
import basket from './api/basket';
import tokens from './api/tokens';
import error from './error';

const rootReducer = combineReducers({
  toastr,
  auth,
  product,
  basket,
  tokens,
  error,
});

export default rootReducer;
