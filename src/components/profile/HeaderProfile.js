import React from "react";
import { FaCamera } from "react-icons/fa";

import userEmpty from "../../assets/userEmpty.jpg";
import poster from "../../assets/poster.jpg";
const HeaderProfile = () => {
  return (
    <div className="container-header-profile box">
      <div className="container-fotos">
        <img className="img-poster" src={poster} alt="imagen poster perfil" />
        <div className="container-foto-profile">
          <div>
            <img src={userEmpty} alt="foto de andres gama" />
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
      <h1>Andres Gama</h1>
    </div>
  );
};

export default HeaderProfile;
