import { SET_ACTIVE_ID } from "../types/draggedItemActiveTypes";

const initialState = {
  activeId: null,
};

const activeIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_ID:
      return {
        ...state,
        activeId: action.payload,
      };
    default:
      return state;
  }
};

export default activeIdReducer;
