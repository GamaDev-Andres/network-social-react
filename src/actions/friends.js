import { addFriend, deleteFriend } from "../helpers/firebase";
import { types } from "../types/types";

export const startAddFriend = (email, userFriend) => {
  return async (dispatch) => {
    await addFriend(email, userFriend);
  };
};

export const startDeleteFriend = (email, userFriend) => {
  return async (dispatch) => {
    await deleteFriend(email, userFriend);
  };
};

export const addFriendAction = (friends) => ({
  type: types.friendsAddFriend,
  payload: friends,
});
