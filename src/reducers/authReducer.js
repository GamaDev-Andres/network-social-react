import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.authLogin:
      console.log(action.payload);
      return {
        ...action.payload,
      };
    case types.authLogOut:
      return {};

    default:
      return state;
  }
};
