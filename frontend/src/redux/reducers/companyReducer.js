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

const initialState = {
  loading: false,
  company: [],
  error: "",
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPANY_REQUEST:
    case UPDATE_COMPANY_REQUEST:
    case DELETE_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        company: action.payload,
        error: "",
      };
    case UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        company: state.company.map((company) =>
          company._id === action.payload._id ? action.payload : company
        ),
        error: "",
      };
    case DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        company: state.company.filter(
          (company) => company._id !== action.payload
        ),
        error: "",
      };
    case FETCH_COMPANY_FAILURE:
    case UPDATE_COMPANY_FAILURE:
    case DELETE_COMPANY_FAILURE:
      return {
        ...state,
        loading: false,
        company: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default companyReducer;
