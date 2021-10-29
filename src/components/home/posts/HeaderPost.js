import moment from "moment";
import "moment/locale/es";
import React from "react";

import userEmpty from "../../../assets/userEmpty.jpg";
const HeaderPost = ({ user, foto, fechaCreacion }) => {
  moment.locale("es");
  const fechaPost = moment(fechaCreacion);
  const fecha = moment(fechaPost).fromNow();

  return (
    <div className="header-post">
      <div className="foto-container">
        <img src={foto || userEmpty} alt="imagen autor publicacion" />
      </div>
      <div className="datos-post-container">
        <h4>{user.displayName}</h4>
        <small>{fecha}</small>
      </div>
    </div>
  );
};

export default HeaderPost;
