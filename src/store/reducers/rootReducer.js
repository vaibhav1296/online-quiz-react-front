import authReducer from "./authReducers";
import testReducer from "./testReducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  test: testReducer,
});

export default rootReducer;
