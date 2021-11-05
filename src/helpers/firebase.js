import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "@firebase/firestore";

import { db } from "../firebase/credentials";

export const mapeoDocsPostsAObjetos = (arrDocs) => {
  return arrDocs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const filtrarPerfil = async (uid) => {
  try {
    const refUsuarios = collection(db, "usuarios");
    const q = query(refUsuarios, where("uid", "==", uid));
    const users = await getDocs(q);
    return users.docs[0];
  } catch (error) {
    console.log("user no existe con ese uid");
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    const refUsuarios = collection(db, "usuarios");
    const users = await getDocs(refUsuarios);
    return users.docs;
  } catch (error) {
    console.log(error);
  }
};

export const addFriend = async (email, userFriend) => {
  try {
    const refCollectionFriends = collection(db, `usuarios/${email}/amigos`);
    await addDoc(refCollectionFriends, {
      ...userFriend,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteFriend = async (email, userFriend) => {
  try {
    const refCollectionFriends = collection(db, `usuarios/${email}/amigos`);
    const q = query(
      refCollectionFriends,
      where("email", "==", userFriend.email)
    );
    const response = await getDocs(q);
    response.docs.forEach(async (document) => {
      const refDoc = doc(db, `usuarios/${email}/amigos`, document.id);
      await deleteDoc(refDoc);
    });
  } catch (error) {
    console.log(error);
  }
};
export const filterFriendsUser = async (email) => {
  try {
    const refCollectionFriends = collection(db, `usuarios/${email}/amigos`);
    const resp = await getDocs(refCollectionFriends);
    return resp.docs;
  } catch (error) {
    console.log(error);
  }
};

export const createDocUser = async (user) => {
  const { uid, displayName, email, photoURL } = user;
  const docRef = doc(db, "usuarios", email);
  const response = await getDoc(docRef);
  if (!response.exists()) {
    await setDoc(docRef, {
      uid,
      displayName,
      email,
      foto: photoURL,
    });
  }
};
