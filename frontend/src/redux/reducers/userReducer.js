import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  REGISTER_USERS_FAILURE,
  REGISTER_USERS_REQUEST,
  REGISTER_USERS_SUCCESS,
} from "../types/userTypes";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
    case REGISTER_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case REGISTER_USERS_SUCCESS:
      return {
        loading: false,
        users: [...state.users, action.payload],
        error: "",
      };
    case FETCH_USERS_FAILURE:
    case REGISTER_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
