import { BASE_URL } from "../../constants";
import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  REGISTER_USERS_FAILURE,
  REGISTER_USERS_REQUEST,
  REGISTER_USERS_SUCCESS,
} from "../types/userTypes";
import axios from "axios";

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

export const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    axios
      .get(`${BASE_URL}/api/users/getUsers`)
      .then((response) => {
        const users = response.data.data;
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchUsersFailure(errorMsg));
      });
  };
};

export const registerUserRequest = () => {
  return {
    type: REGISTER_USERS_REQUEST,
  };
};

export const registerUserSuccess = (registeredUser) => {
  return {
    type: REGISTER_USERS_SUCCESS,
    payload: registeredUser,
  };
};

export const registerUserFailure = (error) => {
  return {
    type: REGISTER_USERS_FAILURE,
    payload: error,
  };
};

export const registerUser = (data) => {
  return (dispatch) => {
    dispatch(registerUserRequest());
    axios
      .post(`${BASE_URL}/api/users/register`, data)
      .then((response) => {
        const registeredUser = response.data.data;
        dispatch(registerUserSuccess(registeredUser));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(registerUserFailure(errorMsg));
      });
  };
};
