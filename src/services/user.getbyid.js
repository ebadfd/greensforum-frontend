import { config } from "../config";

export const getUserByID = async (id) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const fetchedData = await fetch(`${config.v1}user/info/${id}`, requestOptions)
    .then((result) => result.json())
    .then((data) => {
      return data;
    });

  return fetchedData;
};
