import { addDoc, collection } from "@firebase/firestore";
import { auth, db } from "../firebase/credentials";
import { types } from "../types/types";

// acciones de publicaciones

export const startCreatePost = (texto) => {
  return async (dispatch, getState) => {
    const { email, displayName } = getState().auth;
    const foto = auth.currentUser.photoURL;
    const refCollection = collection(db, `usuarios/${email}/posts`);
    const fechaCreacion = new Date().getTime();
    try {
      const response = await addDoc(refCollection, {
        texto,
        fechaCreacion,
        userData: { email, displayName, foto },
      });
      dispatch(
        createPost({
          id: response.id,
          texto,
          fechaCreacion,
          userData: { email, displayName, foto },
        })
      );
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

export const getAllPosts = (posts) => {
  return {
    type: types.postGetAllPosts,
    payload: posts,
  };
};

export const clearPosts = () => ({ type: types.postClearPosts });
