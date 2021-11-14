import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { collection, onSnapshot } from "@firebase/firestore";
import Swal from "sweetalert2";

import RowComent from "./RowComent";
import { startAddComentInPost } from "../../../actions/posts";
import { closeModalComents } from "../../../actions/ui";
import { db } from "../../../firebase/credentials";
import { mapeoDocsPostsAObjetos } from "../../../helpers/firebase";

Modal.setAppElement("#root");

const ModalViewComents = () => {
  const { openModalComents } = useSelector((state) => state.ui);
  const [arrComents, setArrComents] = useState([]);
  const dispatch = useDispatch();

  const spanEditable = useRef();

  const handleCloseModalComents = () => {
    dispatch(closeModalComents());
  };

  const handleSubmitComent = (e) => {
    e.preventDefault();

    if (spanEditable.current.textContent.length > 0) {
      dispatch(startAddComentInPost(spanEditable.current.textContent)).then(
        () => {
          spanEditable.current.textContent = "";
        }
      );
    }
  };

  const handleLengthComent = (e) => {
    if (e.target.textContent.length > 128) {
      Swal.fire(
        "Error",
        "El comentario no puede tener mas de 128 caracteres",
        "error"
      ).then(() => {
        let aux = spanEditable.current.textContent.substring(0, 128);
        e.target.textContent = aux;
      });
    }
  };

  useEffect(() => {
    if (openModalComents) {
      const refCollectionComents = collection(
        db,
        `posts/${openModalComents.idPost}/coments`
      );
      onSnapshot(refCollectionComents, (querySnaphots) => {
        const arrComentsOfDocs = mapeoDocsPostsAObjetos(querySnaphots.docs);
        setArrComents(arrComentsOfDocs);
      });
    }
  }, [openModalComents]);

  return (
    <>
      <Modal
        className="modal box animate__animated animate__bounceInUp animate__fast"
        isOpen={openModalComents?.open}
        onRequestClose={handleCloseModalComents}
        closeTimeoutMS={100}
      >
        <div className="main-container-modal-coments">
          <div className="container-title">
            <h2>Comentarios</h2>
            <button onClick={handleCloseModalComents}>
              <AiOutlineClose />
            </button>
          </div>
          <div className="main-container-coments">
            {arrComents.map((coment) => (
              <RowComent key={coment.id} coment={coment} />
            ))}
          </div>
          <div className="container-textarea-coment">
            <form onSubmit={handleSubmitComent} className="form-modal">
              <span
                onInput={handleLengthComent}
                ref={spanEditable}
                contentEditable
                className="text-coment text-area-fake"
              ></span>

              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalViewComents;
