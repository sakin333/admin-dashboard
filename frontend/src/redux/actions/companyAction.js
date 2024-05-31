import axios from "axios";
import {
  FETCH_COMPANY_FAILURE,
  FETCH_COMPANY_REQUEST,
  FETCH_COMPANY_SUCCESS,
} from "../types/companyTypes";
import { BASE_URL } from "../../constants";

export const fetchCompanyRequest = () => {
  return {
    type: FETCH_COMPANY_REQUEST,
  };
};

export const fetchCompanySuccess = (company) => {
  return {
    type: FETCH_COMPANY_SUCCESS,
    payload: company,
  };
};

export const fetchCompanyFailue = (error) => {
  return {
    type: FETCH_COMPANY_FAILURE,
    payload: error,
  };
};

export const fetchCompany = () => {
  return (dispatch) => {
    dispatch(fetchCompanyRequest());
    axios
      .get(`${BASE_URL}/api/companies/companies`)
      .then((response) => {
        const companies = response.data;
        dispatch(fetchCompanySuccess(companies));
      })
      .catch((error) => {
        const errorMsg = error.error;
        dispatch(fetchCompanyFailue(errorMsg));
      });
  };
};
