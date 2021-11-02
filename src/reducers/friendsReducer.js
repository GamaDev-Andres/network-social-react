import { types } from "../types/types";

export const friendReducer = (state = [], action) => {
  switch (action.type) {
    case types.friendsAddFriend:
      return action.payload;
    default:
      return state;
  }
};
