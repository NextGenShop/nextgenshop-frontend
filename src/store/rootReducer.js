import { combineReducers } from "redux";
import { reducer as toastr } from "react-redux-toastr";
import auth from "./api/auth";
import product from "./api/product";
import basket from "./api/basket";
import error from "./error";

const rootReducer = combineReducers({
  toastr,
  auth,
  product,
  basket,
  error,
});

export default rootReducer;
