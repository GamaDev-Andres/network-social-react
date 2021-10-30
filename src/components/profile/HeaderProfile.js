import React from "react";
import { FaCamera } from "react-icons/fa";

import userEmpty from "../../assets/userEmpty.jpg";
import poster from "../../assets/poster.jpg";
import { useSelector } from "react-redux";

const HeaderProfile = () => {
  const profileVisited = useSelector((state) => state.profileVisited);

  const { foto, displayName } = profileVisited;
  return (
    <div className="container-header-profile box">
      <div className="container-fotos">
        <img className="img-poster" src={poster} alt="imagen poster perfil" />
        <div className="container-foto-profile">
          <div>
            <img src={foto || userEmpty} alt="foto de andres gama" />
            <button>
              <FaCamera />
            </button>
          </div>
        </div>
        <div className="container-button-poster">
          <button>
            <FaCamera />
          </button>
        </div>
      </div>
      <h1>{displayName}</h1>
    </div>
  );
};

export default HeaderProfile;
