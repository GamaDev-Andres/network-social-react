// acciones de autenticacion
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "@firebase/auth";
import Swal from "sweetalert2";

import { auth } from "../firebase/credentials";
import { validatorErrors } from "../helpers/codeErrorsValidator";
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
        photoURL: "none",
      });

      dispatch(login(user.uid, user.email, user.displayName));
      Swal.fire("Exito!", "Registro exitoso", "success");
    } catch (error) {
      validatorErrors(error.code);
    }
  };
};

export const startLogin = (email, password) => {
  return async (dispatch) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      validatorErrors(error.code);
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

export const startLoginWithGoogle = () => {
  const provider = new GoogleAuthProvider();

  return async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
      validatorErrors(error.code);
    }
  };
};

export const startLogOut = () => {
  return async (dispatch) => {
    await signOut(auth);
    dispatch(logOut());
  };
};

export const logOut = () => ({
  type: types.authLogOut,
});
