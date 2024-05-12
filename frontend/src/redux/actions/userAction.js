import { SET_USER } from "../types/userTypes";

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
