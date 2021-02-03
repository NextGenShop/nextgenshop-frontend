import { combineReducers } from "redux";
import { reducer as toastr } from "react-redux-toastr";
import auth from "./api/auth";

const rootReducer = combineReducers({
  toastr,
  auth,
});

export default rootReducer;
