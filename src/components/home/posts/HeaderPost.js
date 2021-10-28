import React from "react";
import userEmpty from "../../../assets/userEmpty.jpg";
const HeaderPost = ({ idPost }) => {
  return (
    <div className="header-post">
      <div className="foto-container">
        <img src={userEmpty} alt="imagen autor publicacion" />
      </div>
      <div className="datos-post-container">
        <h4>Juanito</h4>
        <small>2h</small>
      </div>
    </div>
  );
};

export default HeaderPost;
