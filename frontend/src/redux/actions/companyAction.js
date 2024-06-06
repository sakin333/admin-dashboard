import axios from "axios";
import {
  DELETE_COMPANY_FAILURE,
  DELETE_COMPANY_REQUEST,
  DELETE_COMPANY_SUCCESS,
  FETCH_COMPANY_FAILURE,
  FETCH_COMPANY_REQUEST,
  FETCH_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAILURE,
  UPDATE_COMPANY_REQUEST,
  UPDATE_COMPANY_SUCCESS,
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
        const companies = response.data.data;
        dispatch(fetchCompanySuccess(companies));
      })
      .catch((error) => {
        const errorMsg = error.error;
        dispatch(fetchCompanyFailue(errorMsg));
      });
  };
};

export const updateCompanyRequest = () => {
  return {
    type: UPDATE_COMPANY_REQUEST,
  };
};

export const updateCompanySuccess = (updatedCompany) => {
  return {
    type: UPDATE_COMPANY_SUCCESS,
    payload: updatedCompany,
  };
};

export const updateCompanyFailure = (error) => {
  return {
    type: UPDATE_COMPANY_FAILURE,
    payload: error,
  };
};

export const updateCompany = (companyId, data) => {
  return (dispatch) => {
    dispatch(updateCompanyRequest());
    axios
      .post(
        `${BASE_URL}/api/companies/editCompany?companyId=${companyId}`,
        data
      )
      .then((response) => {
        const updatedTask = response.data.data;
        dispatch(updateCompanySuccess(updatedTask));
      })
      .catch(({ response }) => {
        const errorMsg = response.data.error;
        dispatch(updateCompanyFailure(errorMsg));
      });
  };
};

export const deleteCompanyRequest = () => {
  return {
    type: DELETE_COMPANY_REQUEST,
  };
};

export const deleteCompanySuccess = (companyId) => {
  return {
    type: DELETE_COMPANY_SUCCESS,
    payload: companyId,
  };
};

export const deleteCompanyFailure = (error) => {
  return {
    type: DELETE_COMPANY_FAILURE,
    payload: error,
  };
};

export const deleteCompany = (companyId) => {
  return (dispatch) => {
    dispatch(deleteCompanyRequest());
    axios
      .delete(`${BASE_URL}/api/companies/deleteCompany?companyId=${companyId}`)
      .then((response) => {
        dispatch(deleteCompanySuccess(companyId));
      })
      .catch(({ response }) => {
        const errorMsg = response.data.error;
        dispatch(deleteCompanyFailure(errorMsg));
      });
  };
};
