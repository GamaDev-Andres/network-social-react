import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { startGetFriendsUserVisited } from "../../actions/profile";
import Friend from "./Friend";
const SectionFriends = () => {
  const profileVisited = useSelector((state) => state.profileVisited);
  const { friends } = profileVisited;
  const dispatch = useDispatch();
  useEffect(() => {
    function getFriends() {
      dispatch(startGetFriendsUserVisited(profileVisited.email));
    }

    getFriends();
  }, [dispatch, profileVisited.email]);

  if (!friends) {
    return <h1>Loading</h1>;
  }
  return (
    <section className="main-container-section-friends">
      <div className="container-friends">
        <h2>Amigos</h2>
        <div className="container-grid-friends">
          <div className="friends">
            {friends.map((friend) => (
              <Friend key={friend.id} friend={friend} />
            ))}
          </div>
          <button type="button">Ver todos</button>
        </div>
      </div>
    </section>
  );
};

export default SectionFriends;
