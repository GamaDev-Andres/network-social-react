import React from "react";
import { useSelector } from "react-redux";
import { auth } from "../../firebase/credentials";
import userEmpty from "../../assets/userEmpty.jpg";
const Header = () => {
  const { displayName } = useSelector((state) => state.auth);
  const primerNombre = displayName.split(" ")[0];

  return (
    <header className="box">
      <div className="header-container">
        <div className="foto-container">
          <img
            src={auth.currentUser.photoURL || userEmpty}
            alt="muestra tu foto"
          />
        </div>
        <div className="button-posts-container">
          <span>¿Que estás pensando, {primerNombre}?</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
