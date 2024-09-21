// auth.jsx
const TOKEN_KEY = 'authToken';

// Utility function to decode JWT
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c =>
    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  ).join(''));

  return JSON.parse(jsonPayload);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function isTokenExpired() {
  const token = getToken();
  if (!token) return true;

  const decodedToken = parseJwt(token);
  const expirationTime = new Date(decodedToken.exp * 1000);

  return new Date() > expirationTime;
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  console.log("here");
    localStorage.removeItem(TOKEN_KEY);
}
