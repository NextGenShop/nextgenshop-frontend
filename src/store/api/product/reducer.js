import * as types from "./types";

const initialState = {
  products: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${types.GET_PRODUCTS}_SUCCESS`:
      return {
        ...state,
        products: action.response,
      };

    default:
      return state;
  }
};

export default reducer;
