import { config } from "../config";

export const GetQuestionsTags = async (slug) => {
  var headers = new Headers();

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  const fetchedData = await fetch(
    `${config.v1}view/questions/${slug}`,
    requestOptions
  )
    .then((result) => result.json())
    .then((data) => {
      return data;
    });

  return fetchedData;
};
