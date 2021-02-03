const reducer = (state = {}, action) => {
  const { type, error } = action;
  let errorMessage = error;
  if (Array.isArray(error)) {
    errorMessage = error[0];
  }
  const matches = /(.*)_(REQUEST|FAILURE|CLEARERR)/.exec(type);
  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === "FAILURE" ? errorMessage : "",
  };
};

export default reducer;
