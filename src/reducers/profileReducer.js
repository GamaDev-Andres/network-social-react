import { types } from "../types/types";

export const profileReducer = (state = null, action) => {
  switch (action.type) {
    case types.profiletSetUser:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return null;
  }
};
