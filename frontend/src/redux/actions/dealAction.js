import axios from "axios";
import {
  FETCH_DEALS_FAILURE,
  FETCH_DEALS_REQUEST,
  FETCH_DEALS_SUCCESS,
} from "../types/dealTypes";
import { BASE_URL } from "../../constants";

export const fetchDealsRequest = () => {
  return {
    type: FETCH_DEALS_REQUEST,
  };
};

export const fetchDealsSuccess = (deals) => {
  return {
    type: FETCH_DEALS_SUCCESS,
    payload: deals,
  };
};

export const fetchDealsFailure = (error) => {
  return {
    type: FETCH_DEALS_FAILURE,
    payload: error,
  };
};

export const fetchDeals = () => {
  return (dispatch) => {
    dispatch(fetchDealsRequest());
    axios
      .get(`${BASE_URL}/deals`)
      .then((response) => {
        const deals = response.data;
        dispatch(fetchDealsSuccess(deals));
      })
      .catch((error) => {
        const errorMsg = error.error;
        dispatch(fetchDealsFailure(errorMsg));
      });
  };
};
