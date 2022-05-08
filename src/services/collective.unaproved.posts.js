import { config } from "../config";
import { isValidToken, getAuthStorage } from "../authtoken";

export const CollectiveUnaprovedPosts = async (slug) => {
  if (!isValidToken()) {
    return {
      error: "Missing Authentication",
      details: "Please make sure you are loggedin and have enough privilages",
    };
  }

  const tokens = getAuthStorage();

  var headers = new Headers();
  headers.append("Authorization", `Bearer ${tokens.auth_token}`);

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  const fetchedData = await fetch(
    `${config.v1}/collectives/${slug}/post/unaproved`,
    requestOptions
  )
    .then((result) => result.json())
    .then((data) => {
      return data;
    });

  return fetchedData;
};

export const CurrentUserUnAprovedPosts = async () => {
  if (!isValidToken()) {
    return {
      error: "Missing Authentication",
      details: "Please make sure you are loggedin and have enough privilages",
    };
  }

  const tokens = getAuthStorage();

  var headers = new Headers();
  headers.append("Authorization", `Bearer ${tokens.auth_token}`);

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  const fetchedData = await fetch(
    `${config.v1}/user/me/unaproved/posts`,
    requestOptions
  )
    .then((result) => result.json())
    .then((data) => {
      return data;
    });

  return fetchedData;
};
