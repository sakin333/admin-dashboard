import axios from "axios";
import {
  CREATE_TASK_FAILURE,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
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

export const deleteTaskRequest = () => {
  return {
    type: DELETE_TASK_REQUEST,
  };
};

export const deleteTaskSuccess = (taskId) => {
  return {
    type: DELETE_TASK_SUCCESS,
    payload: taskId,
  };
};

export const deleteTaskFailure = (error) => {
  return {
    type: DELETE_TASK_FAILURE,
    payload: error,
  };
};

export const deleteTask = (taskId) => {
  return (dispatch) => {
    dispatch(deleteTaskRequest());
    axios
      .delete(`${BASE_URL}/deleteTask?taskId=${taskId}`)
      .then((response) => {
        dispatch(deleteTaskSuccess(taskId));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(deleteTaskFailure(errorMsg));
      });
  };
};

export const createTaskRequest = () => {
  return {
    type: CREATE_TASK_REQUEST,
  };
};

export const createTaskSuccess = (createdTask) => {
  return {
    type: CREATE_TASK_SUCCESS,
    payload: createdTask,
  };
};

export const createTaskFailure = (error) => {
  return {
    type: CREATE_TASK_FAILURE,
    payload: error,
  };
};

export const createTask = (data) => {
  return (dispatch) => {
    dispatch(createTaskRequest());
    axios
      .post(`${BASE_URL}/addTask`, data)
      .then((response) => {
        console.log(response);
        const createdTask = response.data.data;
        dispatch(createTaskSuccess(createdTask));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(createTaskFailure(errorMsg));
      });
  };
};
