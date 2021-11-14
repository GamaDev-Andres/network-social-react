import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { auth } from "../../firebase/credentials";
import userEmpty from "../../assets/userEmpty.jpg";
import { openModal } from "../../actions/ui";

const Header = () => {
  const { displayName, uid } = useSelector((state) => state.auth);
  const primerNombre = displayName?.split(" ")[0];
  const dispatch = useDispatch();
  const history = useHistory();

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleRedirectMyProfile = () => {
    history.push(`/perfil/${uid}`);
  };
  return (
    <header className="box">
      <div className="header-container">
        <div onClick={handleRedirectMyProfile} className="foto-container">
          <img
            src={auth.currentUser.photoURL || userEmpty}
            alt="muestra tu foto"
          />
        </div>
        <div onClick={handleOpenModal} className="button-posts-container">
          <span>¿Qué estás pensando, {primerNombre}?</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
