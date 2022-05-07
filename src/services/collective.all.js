import { config } from "../config";

export const ViewCollectives = async () => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const fetchedData = await fetch(`${config.v1}collectives`, requestOptions)
    .then((result) => result.json())
    .then((data) => {
      return data;
    });

  return fetchedData;
};
