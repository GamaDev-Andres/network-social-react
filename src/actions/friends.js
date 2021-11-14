import { addFriend, deleteFriend } from "../helpers/firebase";
import { types } from "../types/types";

export const startAddFriend = (email, userFriend) => {
  return async () => {
    await addFriend(email, userFriend);
  };
};

export const startDeleteFriend = (email, userFriend) => {
  return async () => {
    await deleteFriend(email, userFriend);
  };
};

export const addFriendAction = (friends) => ({
  type: types.friendsAddFriend,
  payload: friends,
});
