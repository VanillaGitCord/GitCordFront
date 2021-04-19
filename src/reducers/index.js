import { combineReducers } from "redux";

import roomReducer from "./roomReducer";
import userReducer from "./userReducer";
import socketReducer from "./socketReducer";

const rootReducer = combineReducers({
  roomReducer,
  userReducer,
  socketReducer
});

export default rootReducer;
