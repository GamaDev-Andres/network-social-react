import { addDoc, collection } from "@firebase/firestore";
import { auth, db } from "../firebase/credentials";

// acciones de publicaciones

export const startCreatePost = (texto) => {
  return async (dispatch, getState) => {
    const { email, displayName } = getState().auth;
    const foto = auth.currentUser.photoURL;
    const refCollection = collection(db, `usuarios/${email}/posts`);
    const fechaCreacion = new Date().getTime();
    const response = await addDoc(refCollection, {
      texto,
      fechaCreacion,
      userData: { email, displayName, foto },
    });
    console.log(response.id);
  };
};

export const createPost = () => {};
