import { filtrarPerfil } from "../helpers/firebase";
import { types } from "../types/types";

export const getUserProfileAction = (uid) => {
  return async (dispatch) => {
    const user = await filtrarPerfil(uid);
    dispatch(setUserProfile(user?.data()));
  };
};

const setUserProfile = (user) => {
  if (!user) {
    return {
      type: null,
    };
  }
  return {
    type: types.profiletSetUser,
    payload: user,
  };
};
