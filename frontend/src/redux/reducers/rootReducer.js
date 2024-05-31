import { combineReducers } from "redux";
import userReducer from "./userReducer";
import eventsReducer from "./eventsReducer";
import dealsReducer from "./dealReducer";
import modalReducer from "./modalReducer";
import companyReducer from "./companyReducer";
import taskReducer from "./taskReducer";

const rootReducer = combineReducers({
  user: userReducer,
  event: eventsReducer,
  deal: dealsReducer,
  modal: modalReducer,
  company: companyReducer,
  task: taskReducer,
});

export default rootReducer;
