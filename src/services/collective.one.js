import { config } from "../config";

export const GetCollectivebyinfo = async (slug) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const fetchedData = await fetch(
    `${config.v1}/collectives/${slug}`,
    requestOptions
  )
    .then((result) => result.json())
    .then((data) => {
      return data;
    });

  return fetchedData;
};
