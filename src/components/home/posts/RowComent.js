import React from "react";
import RowLike from "./RowLike";

const RowComent = ({ coment }) => {
  const { fechaComentario: fechaReaccion, texto } = coment;
  return (
    <div className="main-container-rowComent">
      <RowLike user={{ ...coment, fechaReaccion }} />
      <div className="container-text-coment">
        <p>{texto}</p>
      </div>
    </div>
  );
};

export default RowComent;
