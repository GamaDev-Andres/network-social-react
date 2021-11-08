import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "@firebase/firestore";

import { auth, db } from "../firebase/credentials";
import { getDocOfCollectionLikesOneUser } from "../helpers/firebase";
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
  return async () => {
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
  return async () => {
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

export const startToggleLike = (idPost) => {
  return async (dispatch, getState) => {
    const user = getState().auth;
    const refDoc = doc(db, `posts/${idPost}/likes`, user.email);
    const isLike = await getDocOfCollectionLikesOneUser(
      `posts/${idPost}/likes`,
      user.email
    );
    if (!isLike) {
      await setDoc(refDoc, {
        displayName: user.displayName,
        foto: auth.currentUser.photoURL,
        fechaReaccion: new Date().getTime(),
        uid: user.uid,
      });
    } else {
      await deleteDoc(refDoc);
    }
    try {
    } catch (error) {
      console.log(error);
    }
  };
};

export const startAddComentInPost = (idPost, texto) => {
  return async (dispatch, getState) => {
    try {
      const user = getState().auth;
      const refDoc = doc(db, `posts/${idPost}/coments`, user.email);
      await setDoc(refDoc, {
        displayName: user.displayName,
        foto: auth.currentUser.photoURL,
        fechaComentario: new Date().getTime(),
        uid: user.uid,
        texto,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
