import React from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { AiOutlineClose } from "react-icons/ai";
import RowLike from "./RowLike";
import RowComent from "./RowComent";
import useForm from "../../../hooks/useForm";
import { startAddComentInPost } from "../../../actions/posts";
import { closeModalComents } from "../../../actions/ui";
Modal.setAppElement("#root");

const ModalViewComents = () => {
  const { openModalComents } = useSelector((state) => state.ui);
  // const { openModalComents } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [formValues, setFormValue, reset] = useForm({
    texto: "",
  });
  const handleCloseModalComents = () => {
    console.log("cerrando modal coments");
    dispatch(closeModalComents());
  };

  const handleSubmitComent = () => {
    if (formValues.texto > 0) {
      dispatch(startAddComentInPost(formValues.texto));
    }
  };

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
            {openModalComents?.data?.map((coment) => (
              <RowComent key={coment.id} />
            ))}
          </div>
          <div className="container-textarea-coment">
            <form onSubmit={handleSubmitComent} className="form-coment">
              <textarea
                onChange={setFormValue}
                value={formValues.texto}
                name="comentario"
                maxLength="128"
              ></textarea>
              <button type="submit">Enviar</button>
            </form>
          </div>
          {/* {openModalComents?.data?.length === 0 && (
            <h3>Sé el primero en reaccionar</h3>
          )}
          {openModalComents?.data?.map((like) => (
            <RowLike key={like.id} user={like} />
          ))} */}
        </div>
      </Modal>
    </>
  );
};

export default ModalViewComents;
