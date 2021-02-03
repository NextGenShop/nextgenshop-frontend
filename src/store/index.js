import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import apiMiddleware from "../utils/apiMiddleware";
import config from "../config";
import rootReducer from "./rootReducer";

const composeEnhancers = config.ENV === "production" ? compose : composeWithDevTools;
const enhancers = [applyMiddleware(thunk, apiMiddleware)];
const store = createStore(rootReducer, composeEnhancers(...enhancers));

export default store;
