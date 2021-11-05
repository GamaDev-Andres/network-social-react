import { types } from "../types/types";

export const openModal = (id = false) => ({
  type: types.uiOpenModal,
  payload: id,
});

export const closeModal = () => ({
  type: types.uiCloseModal,
});
