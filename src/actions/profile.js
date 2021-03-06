import { doc, updateDoc } from "@firebase/firestore";

import { db } from "../firebase/credentials";
import {
  filterFriendsUser,
  filtrarPerfil,
  mapeoDocsPostsAObjetos,
} from "../helpers/firebase";
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

export const getPostsUserProfile = (posts) => {
  return {
    type: types.profileSetPosts,
    payload: posts,
  };
};

export const clearUserVisited = () => ({
  type: types.profileClearUserVisited,
});

export const startGetFriendsUserVisited = (email) => {
  return async (dispatch) => {
    const response = await filterFriendsUser(email);
    const arrfriends = mapeoDocsPostsAObjetos(response);
    dispatch(setFriendsUserVisited(arrfriends));
  };
};

const setFriendsUserVisited = (friends) => ({
  type: types.profileSetFriends,
  payload: friends,
});

export const startEditInfoUser = (email, data) => {
  return async () => {
    const docCollection = doc(db, "usuarios", email);
    try {
      await updateDoc(docCollection, {
        ...data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
