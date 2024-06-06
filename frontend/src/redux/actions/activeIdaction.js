import { SET_ACTIVE_ID } from "../types/draggedItemActiveTypes";

export const getActiveId = (id) => {
  return {
    type: SET_ACTIVE_ID,
    payload: id,
  };
};

export const setActiveId = (id) => {
  return (dispatch) => {
    dispatch(getActiveId(id));
  };
};
