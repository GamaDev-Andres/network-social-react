import { getUsers, mapeoDocsPostsAObjetos } from "../helpers/firebase";
import { types } from "../types/types";

export const StartGetAllUsers = () => {
  return async (dispatch) => {
    const docsUsers = await getUsers();
    const arrUsers = mapeoDocsPostsAObjetos(docsUsers);

    dispatch(setAllUsers(arrUsers));
  };
};

const setAllUsers = (users) => ({
  type: types.usersSetAllUsers,
  payload: users,
});
