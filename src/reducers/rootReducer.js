import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { friendReducer } from "./friendsReducer";
import { postReducer } from "./postReducer";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  posts: postReducer,
  amigos: friendReducer,
});
