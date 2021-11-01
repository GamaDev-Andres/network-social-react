import { getUsers, mapeoDocsPostsAObjetos } from "../helpers/firebase";
import { types } from "../types/types";

export const StartGetAllUsers = (uidCurentUser) => {
  return async (dispatch) => {
    const docsUsers = await getUsers();

    let arrUsers = mapeoDocsPostsAObjetos(docsUsers);

    arrUsers = arrUsers.filter(
      (userObject) => userObject.uid !== uidCurentUser
    );
    dispatch(setAllUsers(arrUsers));
  };
};

const setAllUsers = (users) => ({
  type: types.usersSetAllUsers,
  payload: users,
});
