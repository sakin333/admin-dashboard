import { combineReducers } from "redux";
import userReducer from "./userReducer";
import eventsReducer from "./eventsReducer";
import dealsReducer from "./dealReducer";
import modalReducer from "./modalReducer";
import companyReducer from "./companyReducer";

const rootReducer = combineReducers({
  user: userReducer,
  event: eventsReducer,
  deal: dealsReducer,
  modal: modalReducer,
  company: companyReducer,
});

export default rootReducer;
