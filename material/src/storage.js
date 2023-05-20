import SignupReducer from "./cmp/Signup/Signup.reducer";
import LoginReducer from "./cmp/Login/Login.reducer";
import ForgotReducer from "./cmp/Forgot/Forgot.reducer";
import RevenueReducer from "./cmp/Admin/Dashboard/Modern/RevenueUpdates/Revenue.reducer";
import NotesReducer from "./cmp/Admin/Notes/Notes.reducer";
import AdminReducer from "./cmp/Admin/Admin.reducer";
import { createStore, applyMiddleware, combineReducers } from "redux";
//import logger from "redux-logger";
import thunk from "redux-thunk";
const middlewares = applyMiddleware(
  //logger,
  thunk
);
const root = combineReducers({
  SignupReducer,
  LoginReducer,
  ForgotReducer,
  RevenueReducer,
  NotesReducer,
  AdminReducer
});
const storage = createStore(root,{},middlewares);
export default storage;
