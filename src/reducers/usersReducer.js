import { types } from "../types/types";

export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case types.usersSetAllUsers:
      return action.payload;

    default:
      return state;
  }
};
