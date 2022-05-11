import { isValidToken } from "../authtoken";

export const isJoined = (data) => {
  if (!isValidToken) {
    return false;
  }

  let user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return false;
  }

  const v = data.Members.find((e) => e.ID == user.ID);
  if (v) {
    return true;
  }
  return false;
};
