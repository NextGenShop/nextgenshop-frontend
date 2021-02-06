import authHeader from "../../../utils/authHeader";
import * as types from "./types";

const baseUrl = "/api/product";

export const getProducts = (query, retailer, limit) => (dispatch, getState) => {
  let searchParams = {};
  if (query) {
    searchParams.query = query;
  }
  if (retailer) {
    searchParams.retailer = retailer;
  }
  if (limit) {
    searchParams.limit = limit;
  }
  dispatch({
    type: "API",
    name: types.GET_PRODUCTS,
    url: baseUrl,
    requestData: {
      method: "GET",
      headers: authHeader(getState()),
      params: searchParams,
    },
  });
};

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: `${types.GET_PRODUCTS}_CLEARERR`,
  });
};