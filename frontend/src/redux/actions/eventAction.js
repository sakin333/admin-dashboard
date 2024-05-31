import { BASE_URL } from "../../constants";
import {
  FETCH_EVENTS_FAILURE,
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
} from "../types/eventTypes";
import axios from "axios";

export const fetchEventsRequest = () => {
  return {
    type: FETCH_EVENTS_REQUEST,
  };
};

export const fetchEventsSuccess = (events) => {
  return {
    type: FETCH_EVENTS_SUCCESS,
    payload: events,
  };
};

export const fetchEventsFailure = (error) => {
  return {
    type: FETCH_EVENTS_FAILURE,
    payload: error,
  };
};

export const fetchEvents = () => {
  return (dispatch) => {
    dispatch(fetchEventsRequest());
    axios
      .get(`${BASE_URL}/api/events/eventsList`)
      .then((response) => {
        const events = response.data;
        dispatch(fetchEventsSuccess(events));
      })
      .catch((error) => {
        const errorMsg = error.error;
        dispatch(fetchEventsFailure(errorMsg));
      });
  };
};
