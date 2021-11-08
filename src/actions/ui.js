import { types } from "../types/types";

export const openModal = (id = false) => ({
  type: types.uiOpenModal,
  payload: id,
});

export const closeModal = () => ({
  type: types.uiCloseModal,
});

export const openModalInfo = () => ({
  type: types.uiOpenModalInfo,
});
export const closeModalInfo = () => ({
  type: types.uiCloseModalInfo,
});

export const openModalLikes = (arrlikes) => ({
  type: types.uiOpenModalLikes,
  payload: arrlikes,
});
export const closeModalLikes = () => ({
  type: types.uiCloseModalLikes,
});
export const openModalComents = (data) => ({
  type: types.uiOpenModalComents,
  payload: data,
});
export const closeModalComents = () => ({
  type: types.uiCloseModalComents,
});
