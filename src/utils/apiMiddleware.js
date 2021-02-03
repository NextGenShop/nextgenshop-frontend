import axios from "axios";
import config from "../../config";

// exampleRequest {
//   headers?: any;
//   data?: any;
//   url: string;
//   method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
// }

const apiMiddleware = ({ dispatch }) => (next) => (action) => {
  next(action);

  if (action.type !== "API") return;

  const { name, url, requestData, extraData } = action;
  axios.defaults.baseURL = config.API_URL;
  axios.defaults.headers.common["Content-Type"] = "application/json";

  let req = {
    url,
    method: requestData.method,
  };
  if (requestData.headers) {
    req.headers = requestData.headers;
  }
  if (requestData.data) {
    req.data = requestData.data;
  }

  dispatch({ type: `${name}_REQUEST` });
  axios
    .request(req)
    .then(({ data }) => {
      dispatch({ type: `${name}_SUCCESS`, response: data, extraData });
    })
    .catch((err) => {
      const errorMessage = err.response ? err.response.data.error : "An unknown error has occurred";
      dispatch({ type: `${name}_FAILURE`, error: errorMessage });
    });
};

export default apiMiddleware;
