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
    case types.uiOpenModalLikes:
      return {
        ...state,
        openModalLikes: {
          open: true,
          data: action.payload,
        },
      };
    case types.uiCloseModalLikes:
      return {
        ...state,
        openModalLikes: { open: false },
      };
    case types.uiOpenModalComents:
      return {
        ...state,
        openModalComents: {
          open: true,
          idPost: action.payload.idPost,
        },
      };
    case types.uiCloseModalComents:
      return {
        ...state,
        openModalComents: { open: false },
      };
    case types.uiaddComentsToModal:
      return {
        ...state,
        openModalComents: {
          ...state.openModalComents,
          data: action.payload,
        },
      };
    default:
      return state;
  }
};
