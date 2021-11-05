import moment from "moment";
import "moment/locale/es";
import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";

import userEmpty from "../../../assets/userEmpty.jpg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { openModal } from "../../../actions/ui";
import { startDeletePost } from "../../../actions/posts";
import Swal from "sweetalert2";

const HeaderPost = ({ data }) => {
  const { displayName, foto, fechaCreacion, uid, id } = data;
  const history = useHistory();
  const menu = useRef();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  moment.locale("es");
  const fechaPost = moment(fechaCreacion);
  const fecha = moment(fechaPost).fromNow();

  const handleRedirectProfile = () => {
    history.push(`/perfil/${uid}`);
  };

  const handleOpenMenu = () => {
    menu.current.classList.toggle("oculto");
  };

  const handleOpenModalEdit = () => {
    dispatch(openModal(id));
  };

  const handleDeletePost = () => {
    Swal.fire({
      title: "Seguro@?",
      text: "¿Deseas eliminar el post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((resultado) => {
      if (resultado.value) {
        dispatch(startDeletePost(id)).then(() => {
          Swal.fire("Exito!", "Post eliminado!", "success");
        });
      }
    });
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
      {auth.uid === uid && (
        <div className="container-options">
          <BsThreeDots onClick={handleOpenMenu} className="options-post" />
          <div ref={menu} className="container-items-options oculto">
            <div onClick={handleOpenModalEdit} className="option-edit">
              <span>editar</span>
            </div>
            <div onClick={handleDeletePost} className="option-delete">
              <span>eliminar</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderPost;
