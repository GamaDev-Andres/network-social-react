import React from "react";
import { ImHome2 } from "react-icons/im";
import { AiFillHeart } from "react-icons/ai";
import { MdAccessTimeFilled, MdEmail } from "react-icons/md";

const SectionInforProfile = () => {
  return (
    <section className="main-container-info-profile">
      <div className="container-info">
        <h2>Detalles</h2>
        <div className="container-details">
          <div className="locacion">
            <ImHome2 />
            <span>
              Vive en <strong>villavicencio</strong>
            </span>
          </div>
          <div className="estado-civil">
            <AiFillHeart />
            <span>Soltero</span>
          </div>
          <div className="fecha-creacion">
            <MdAccessTimeFilled />
            <span>Se unio en </span>
          </div>
          <div className="correo">
            <MdEmail />
            <span>correo@correo.com</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionInforProfile;
