// acciones de autenticacion

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "@firebase/auth";
import { auth } from "../firebase/credentials";
import { types } from "../types/types";

export const startRegisterWithEmailAndPassword = (newUser) => {
  return async (dispatch) => {
    const { name, email, password } = newUser;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, {
        displayName: name,
      });

      dispatch(login(user.uid, user.email, user.displayName));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      // dispatch(
      //   login(auth.currentUser.uid, email, auth.currentUser.displayName)
      // );
    } catch (error) {
      console.log(error);
    }
  };
};
export const login = (uid, email, displayName) => ({
  type: types.authLogin,
  payload: {
    displayName,
    email,
    uid,
  },
});

export const startLogOut = () => {
  return async (dispatch) => {
    await signOut(auth);
    dispatch(logOut());
  };
};

export const logOut = () => ({
  type: types.authLogOut,
});
