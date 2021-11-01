import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { friendReducer } from "./friendsReducer";
import { postReducer } from "./postReducer";
import { profileReducer } from "./profileReducer";
import { uiReducer } from "./uiReducer";
import { usersReducer } from "./usersReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  posts: postReducer,
  amigos: friendReducer,
  profileVisited: profileReducer,
  users: usersReducer,
});
