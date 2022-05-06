import { isValidToken, getAuthStorage } from "../authtoken";
import { config } from "../config";

export const GetLoggedInUser = async () => {
  if (!isValidToken()) {
    return null;
  }

  const tokens = getAuthStorage();

  var headers = new Headers();
  headers.append("Authorization", `Bearer ${tokens.auth_token}`);

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  const fetchedData = await fetch(`${config.v1}user/me`, requestOptions)
    .then((result) => result.json())
    .then((data) => {
      return data;
    });

  return fetchedData;
};
