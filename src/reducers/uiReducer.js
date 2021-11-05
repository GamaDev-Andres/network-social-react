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

    case types.uiOpenModalInfo:
      return {
        ...state,
        openModalInfo: true,
      };
    case types.uiCloseModalInfo:
      return {
        ...state,
        openModalInfo: false,
      };

    default:
      return state;
  }
};
