import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "@firebase/firestore";

import { auth, db } from "../firebase/credentials";
import { types } from "../types/types";

export const startCreatePost = (texto) => {
  return async (dispatch, getState) => {
    const { email, displayName, uid } = getState().auth;
    const foto = auth.currentUser.photoURL;
    const refCollection = collection(db, "posts");
    const fechaCreacion = new Date().getTime();
    try {
      await addDoc(refCollection, {
        texto,
        fechaCreacion,
        email,
        displayName,
        foto,
        uid,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createPost = (post) => {
  return {
    type: types.postCreatePost,
    payload: post,
  };
};

export const startEditPost = (texto, id) => {
  return async (dispatch, getState) => {
    const docCollection = doc(db, "posts", id);
    try {
      await updateDoc(docCollection, {
        texto,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const startDeletePost = (id) => {
  return async (dispatch) => {
    try {
      const docCollection = doc(db, "posts", id);

      await deleteDoc(docCollection);
    } catch (error) {
      console.log(error);
    }
  };
};
export const getAllPosts = (posts) => {
  return {
    type: types.postGetAllPosts,
    payload: posts,
  };
};

export const clearPosts = () => ({ type: types.postClearPosts });
