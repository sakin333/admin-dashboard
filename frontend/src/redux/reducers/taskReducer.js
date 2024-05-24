import {
  DELETE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
} from "../types/taskTypes";

const initialState = {
  loading: false,
  tasks: [],
  error: "",
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
    case UPDATE_TASK_REQUEST:
    case DELETE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload,
        error: "",
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
        error: "",
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
        error: "",
      };
    case FETCH_TASKS_FAILURE:
    case UPDATE_TASK_FAILURE:
    case DELETE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default taskReducer;
