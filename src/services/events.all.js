
import { config } from "../config";

export const AllEvents = async () => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const fetchedData = await fetch(`${config.v1}event/all`, requestOptions)
    .then((result) => result.json())
    .then((data) => {
      return data;
    });

  return fetchedData;
};


export const GetEventBySlug = async (slug) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const fetchedData = await fetch(`${config.v1}event/${slug}`, requestOptions)
    .then((result) => result.json())
    .then((data) => {
      return data;
    });

  return fetchedData;
};
