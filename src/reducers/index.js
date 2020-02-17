import { combineReducers } from "redux";
import cultResources from "./cultResources";
import time from "./time";
import cultists from "./cultists";
import knowledge from "./knowledge";
import missions from "./missions";

export default combineReducers({
  cultResources,
  time,
  cultists,
  knowledge,
  missions
});
