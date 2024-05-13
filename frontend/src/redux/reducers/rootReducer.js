import { combineReducers } from "redux";
import userReducer from "./userReducer";
import eventsReducer from "./eventsReducer";
import dealsReducer from "./dealReducer";

const rootReducer = combineReducers({
  user: userReducer,
  event: eventsReducer,
  deal: dealsReducer,
});

export default rootReducer;
