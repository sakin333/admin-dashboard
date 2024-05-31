import { SET_MODAL_CLOSE, SET_MODAL_OPEN } from "../types/modalTypes";

export const openModal = () => {
  return {
    type: SET_MODAL_OPEN,
  };
};

export const closeModal = () => {
  return {
    type: SET_MODAL_CLOSE,
  };
};

export const showModal = () => {
  return (dispatch) => {
    dispatch(openModal());
  };
};

export const cancelModal = () => {
  return (dispatch) => {
    dispatch(closeModal());
  };
};
