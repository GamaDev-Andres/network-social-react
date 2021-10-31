import { types } from "../types/types";

export const profileReducer = (state = null, action) => {
  switch (action.type) {
    case types.profiletSetUser:
      return {
        ...state,
        ...action.payload,
      };
    case types.profileSetPosts:
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
};
