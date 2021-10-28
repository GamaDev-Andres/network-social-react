import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...action.payload,
      };
    case types.authLogOut:
      return {};

    default:
      return state;
  }
};
