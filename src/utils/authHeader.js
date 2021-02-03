export default function authHeader(state) {
  const token = state.auth.token;
  if (token) {
    return { authorization: `Token ${token}` };
  } else {
    return null;
  }
}
