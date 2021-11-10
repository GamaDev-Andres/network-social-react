import React from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import RowLike from "./RowLike";
import { startDeleteComent } from "../../../actions/posts";

const RowComent = ({ coment }) => {
  const { fechaComentario: fechaReaccion, texto } = coment;
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleDeleteComent = () => {
    Swal.fire({
      title: "Seguro@?",
      text: "¿Deseas eliminar el comentario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((resultado) => {
      if (resultado.value) {
        dispatch(startDeleteComent(coment.id)).then(() => {
          Swal.fire("Exito!", "Comentario eliminado!", "success");
        });
      }
    });
  };

  return (
    <div className="main-container-rowComent">
      {coment.uid === auth.uid && (
        <RiDeleteBinFill onClick={handleDeleteComent} className="icon-delete" />
      )}
      <RowLike user={{ ...coment, fechaReaccion }} />
      <div className="container-text-coment">
        <p>{texto}</p>
      </div>
    </div>
  );
};

export default RowComent;
