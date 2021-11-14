import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { startGetFriendsUserVisited } from "../../actions/profile";
import { openModalFriends } from "../../actions/ui";
import Friend from "./Friend";
import ModalFriends from "./ModalFriends";

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

  const handleOpenModalFriends = () => {
    dispatch(openModalFriends());
  };

  return friends?.length > 0 ? (
    <section className="main-container-section-friends">
      <div className="container-friends">
        <h2>Amigos</h2>
        <div className="container-grid-friends">
          <div className="friends">
            {friends.slice(0, 6).map((friend) => (
              <Friend key={friend.id} friend={friend} />
            ))}
          </div>
          <button onClick={handleOpenModalFriends} type="button">
            Ver todos
          </button>
        </div>
      </div>
      <ModalFriends />
    </section>
  ) : (
    <div className="no-friends">
      <h2>Amigos</h2>
      <p>Aún no tienes amigos?</p>
      <Link to={`/busqueda`}>ven y mira algunas sugerencias.</Link>
    </div>
  );
};

export default SectionFriends;
