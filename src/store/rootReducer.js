import { combineReducers } from "redux";
import { reducer as toastr } from "react-redux-toastr";
import auth from "./api/auth";
import error from "./error";

const rootReducer = combineReducers({
  toastr,
  auth,
  error,
});

export default rootReducer;
