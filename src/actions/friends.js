import { addFriend } from "../helpers/firebase";
import { types } from "../types/types";

export const startAddFriend = (uid, userFriend) => {
  return async (dispatch) => {
    await addFriend(uid, userFriend);
  };
};

export const addFriendAction = (friends) => ({
  type: types.friendsAddFriend,
  payload: friends,
});
