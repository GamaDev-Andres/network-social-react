import { types } from "../types/types";
// {
//   texto:"",
//   fechaCreacion:"",
//   user:{
//     email:"",
//     displayName:""
//   }
// }
const initialState = [];

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.postCreatePost:
      return [...state, action.payload];

    default:
      return state;
  }
};
