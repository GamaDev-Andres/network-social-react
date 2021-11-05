import { types } from "../types/types";

const initialState = {
  openModal: false,
  edit: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiOpenModal:
      return {
        ...state,
        edit: action.payload,
        openModal: true,
      };
    case types.uiCloseModal:
      return {
        openModal: false,
        edit: false,
      };

    default:
      return state;
  }
};
