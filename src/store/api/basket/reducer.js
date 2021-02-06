import * as types from "./types";

const initialState = {
  items: [],
  totalPrice: 0,
  shopper: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${types.GET_BASKET}_SUCCESS`:
    case `${types.UPDATE_BASKET}_SUCCESS`:
      return {
        ...state,
        items: action.response.items,
        totalPrice: action.response.totalPrice,
        shopper: action.response.shopper,
      };
    case `${types.DELETE_BASKET}_SUCCESS`:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
