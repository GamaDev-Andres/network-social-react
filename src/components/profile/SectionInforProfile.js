import React from "react";
import { ImHome2 } from "react-icons/im";
import { AiFillHeart } from "react-icons/ai";
import { MdAccessTimeFilled, MdEmail } from "react-icons/md";
import Options from "../layout/Options";
import { useDispatch, useSelector } from "react-redux";
import { openModalInfo } from "../../actions/ui";
import { auth } from "../../firebase/credentials";
import moment from "moment";

const SectionInforProfile = () => {
  const { uid } = useSelector((state) => state.profileVisited);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const fechaCreacion = moment(
    +auth.currentUser.reloadUserInfo.createdAt
  ).format("MMMM-DD-YYYY");
  const handleOpenModalEdit = () => {
    dispatch(openModalInfo());
    console.log("editando");
  };

  return (
    <section className="main-container-info-profile">
      <div className="container-info">
        <h2>Detalles</h2>
        <div className="container-details">
          <div className="locacion">
            <ImHome2 />
            <span>
              Vive en <strong>{user.residencia}</strong>
            </span>
          </div>
          <div className="estado-civil">
            <AiFillHeart />
            <span>{user.relacion}</span>
          </div>
          <div className="fecha-creacion">
            <MdAccessTimeFilled />
            <span>
              Se unio en <strong>{fechaCreacion}</strong>
            </span>
          </div>
          <div className="correo">
            <MdEmail />
            <span>{user.email}</span>
          </div>
        </div>
        <Options uid={uid}>
          <div onClick={handleOpenModalEdit} className="option-edit">
            <span>editar</span>
          </div>
        </Options>
      </div>
    </section>
  );
};

export default SectionInforProfile;
