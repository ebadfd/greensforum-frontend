import { config } from "../config";

export const SearchQuestions = async (searchterm) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const fetchedData = await fetch(
    `${config.v1}view/search?q=${searchterm}`,
    requestOptions
  )
    .then((result) => result.json())
    .then((data) => {
      return data;
    });

  return fetchedData;
};

export const AllQuestions = async () => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const fetchedData = await fetch(
    `${config.v1}view/questions`,
    requestOptions
  )
    .then((result) => result.json())
    .then((data) => {
      return data;
    });

  return fetchedData;
};
