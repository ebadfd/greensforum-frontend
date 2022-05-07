
import { config } from "../config";

export const GetPostbySlug = async (slug ) => {
  var headers = new Headers();

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  const fetchedData = await fetch(`${config.v1}view/q/${slug}`, requestOptions)
    .then((result) => result.json())
    .then((data) => {
      return data;
    });

  return fetchedData;
};
