import React from "react";
import { Link, useHistory } from "react-router-dom";
import userEmpty from "../../assets/userEmpty.jpg";
const Sugerencia = ({ user }) => {
  const { displayName, foto, uid } = user;
  const history = useHistory();
  const handleClickRedirect = () => {
    history.push(`/perfil/${uid}`);
  };
  return (
    <div className="main-container-sugerencia">
      <div onClick={handleClickRedirect} className="container-img-profile">
        <img src={foto || userEmpty} alt={`foto de ${displayName}`} />
      </div>
      <div className="container-info-sugerencia">
        <div className="container-info-user-sugerencia">
          <h3>
            <Link to={`/perfil${uid}`}>{displayName}</Link>
          </h3>
        </div>
        <div className="container-buton-sugerencia">
          <button>Agregar</button>
        </div>
      </div>
    </div>
  );
};

export default Sugerencia;
