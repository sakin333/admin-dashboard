import axios from "axios";
import {
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
} from "../types/taskTypes";
import { BASE_URL } from "../../constants";

export const fetchTasksRequest = () => {
  return {
    type: FETCH_TASKS_REQUEST,
  };
};

export const fetchTasksSuccess = (tasks) => {
  return {
    type: FETCH_TASKS_SUCCESS,
    payload: tasks,
  };
};

export const fetchTasksFailure = (error) => {
  return {
    type: FETCH_TASKS_FAILURE,
    payload: error,
  };
};

export const fetchTasks = () => {
  return (dispatch) => {
    dispatch(fetchTasksRequest());
    axios
      .get(`${BASE_URL}/getTasks`)
      .then((response) => {
        const tasks = response.data.data;
        dispatch(fetchTasksSuccess(tasks));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchTasksFailure(errorMsg));
      });
  };
};

export const updateTaskRequest = () => {
  return {
    type: UPDATE_TASK_REQUEST,
  };
};

export const updateTaskSuccess = (updatedTask) => {
  return {
    type: UPDATE_TASK_SUCCESS,
    payload: updatedTask,
  };
};

export const updateTaskFailure = (error) => {
  return {
    type: UPDATE_TASK_FAILURE,
    payload: error,
  };
};

export const updateTask = (taskId, overColumnId, activeTaskStageId) => {
  return (dispatch) => {
    dispatch(updateTaskRequest());
    axios
      .post(`${BASE_URL}/updateTasks?taskId=${taskId}`, {
        overColumnId,
        activeTaskStageId,
      })
      .then((response) => {
        const updatedTask = response.data.data;
        dispatch(updateTaskSuccess(updatedTask));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(updateTaskFailure(errorMsg));
      });
  };
};
