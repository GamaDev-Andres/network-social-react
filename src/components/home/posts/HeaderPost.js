import moment from "moment";
import "moment/locale/es";
import React from "react";
import { Link, useHistory } from "react-router-dom";

import userEmpty from "../../../assets/userEmpty.jpg";
const HeaderPost = ({ data }) => {
  const history = useHistory();
  moment.locale("es");
  const { displayName, foto, fechaCreacion, uid } = data;
  const fechaPost = moment(fechaCreacion);
  const fecha = moment(fechaPost).fromNow();

  const handleRedirectProfile = () => {
    history.push(`/perfil/${uid}`);
  };

  return (
    <div className="header-post">
      <div onClick={handleRedirectProfile} className="foto-container">
        <img src={foto || userEmpty} alt="imagen autor publicacion" />
      </div>
      <div className="datos-post-container">
        <h4>
          <Link to={`/perfil/${uid}`}>{displayName}</Link>
        </h4>
        <small>{fecha}</small>
      </div>
    </div>
  );
};

export default HeaderPost;
