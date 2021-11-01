import { types } from "../types/types";

const initialState = ["gama_pipe@hotmail.com"];
export const friendReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.friendsAddFriend:
      return action.payload;
    default:
      return state;
  }
};
