import {
  FETCH_DEALS_FAILURE,
  FETCH_DEALS_REQUEST,
  FETCH_DEALS_SUCCESS,
} from "../types/dealTypes";

const initialState = {
  loading: false,
  deals: [],
  error: "",
};

const dealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DEALS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DEALS_SUCCESS:
      return {
        loading: false,
        deals: action.payload,
        error: "",
      };
    case FETCH_DEALS_FAILURE:
      return {
        loading: false,
        deals: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default dealsReducer;
