import jwt_decode from "jwt-decode";
import { config } from "./config";

// check if user's tokens are valid or not
// make sure they are not expired or anything
export const isValidToken = () => {
  let values = getAuthStorage();

  if (!values) {
    return false;
  }

  if (!values.auth_token || !values.refresh_token) {
    return false;
  }

  const decodedAuthToken = jwt_decode(values.auth_token);
  const decodedRefreshToken = jwt_decode(values.refresh_token);

  // auth token expired.
  if (decodedAuthToken.exp * 1000 < Date.now()) {
    // check if refresh token is valid
    if (decodedRefreshToken.exp * 1000 < Date.now()) {
      // if both are invalid there's nothing we can do force re-login
      console.log("token invalid");
      return false;
    } else {
      let updatestatus = updateTokens(values.refresh_token);
      console.log("=============== updating token ===================");
      console.log(updatestatus);
      return updatestatus;
    }
  }
  return true;
};

// return the auth values from localstorage
export const getAuthStorage = () => {
  let values = JSON.parse(localStorage.getItem("auth"));
  return values;
};

// update the auth token
const updateAuthToken = (payload) => {
  localStorage.setItem("auth", JSON.stringify(payload));
};

// get if the user is admin or not
export const isUserAdmin = () => {
  if (!isValidToken) {
    return false;
  }

  let values = getAuthStorage();

  if (values.user_type >= 1) {
    return true;
  }
  return false;
};

// in case user auth token is expired update the token using this function
const updateTokens = (r_token) => {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    refresh_token: r_token,
  });

  var requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
    redirect: "follow",
  };

  fetch(`${config.v1}/user/refresh`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.error) {
        return false;
      } else {
        updateAuthToken(result);
      }
    })
    .catch((error) => {
      console.log("error", error);
      return false;
    });
};
