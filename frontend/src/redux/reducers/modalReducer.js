import { SET_MODAL_CLOSE, SET_MODAL_OPEN } from "../types/modalTypes";

const initialState = {
  isOpen: false,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODAL_OPEN:
      return {
        isOpen: true,
      };
    case SET_MODAL_CLOSE:
      return {
        isOpen: false,
      };
    default:
      return state;
  }
};

export default modalReducer;
