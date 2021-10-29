import { types } from "../types/types";

const initialState = [];

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.postCreatePost:
      return [...state, action.payload];
    case types.postGetAllPosts:
      return action.payload;
    case types.postClearPosts:
      return initialState;

    default:
      return state;
  }
};
