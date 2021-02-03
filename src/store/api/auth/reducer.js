import * as types from "./types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${types.GET_USER}_SUCCESS`:
      return {
        ...state,
        isAuthenticated: true,
        user: action.response,
      };

    case `${types.LOGOUT}_SUCCESS`:
    case `${types.GET_USER}_FAILURE`:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case `${types.REGISTER}_SUCCESS`:
    case `${types.LOGIN}_SUCCESS`:
      localStorage.setItem("token", action.response.token);
      return {
        ...state,
        user: action.response.user,
        token: action.response.token,
        isAuthenticated: true,
      };

    default:
      return state;
  }
};

export default reducer;
