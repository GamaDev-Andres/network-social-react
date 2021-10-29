import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

import { closeModal } from "../../../actions/ui";
import useForm from "../../../hooks/useForm";
import HeaderPost from "./HeaderPost";
import { startCreatePost } from "../../../actions/posts";
import { auth } from "../../../firebase/credentials";

Modal.setAppElement("#root");

const ModalCreatePost = () => {
  const foto = auth.currentUser.photoURL;
  const dispatch = useDispatch();
  const { displayName } = useSelector((state) => state.auth);
  const primerNombre = displayName.split(" ")[0];
  const { openModal } = useSelector((state) => state.ui);
  const [formValues, setFormValue, reset] = useForm({ texto: "" });
  const { texto } = formValues;

  const handleCloseModal = () => {
    reset();
    dispatch(closeModal());
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    dispatch(startCreatePost(texto));
    handleCloseModal();
  };

  return (
    <>
      <Modal
        className="modal box animate__animated animate__bounceInUp animate__fast"
        isOpen={openModal}
        onRequestClose={handleCloseModal}
        closeTimeoutMS={100}
      >
        <div className="container-title">
          <h2>Crea tu publicacion</h2>
          <button onClick={handleCloseModal}>
            <AiOutlineClose />
          </button>
        </div>
        <div className="container-form-post">
          <HeaderPost user={{ displayName }} foto={foto} />
          <form onSubmit={handleSubmitPost} className="form-post">
            <textarea
              maxLength="256"
              name="texto"
              className="text-post"
              placeholder={`¿Qué estás pensando, ${primerNombre}?`}
              value={texto}
              onChange={setFormValue}
            ></textarea>

            <button
              onClick={handleSubmitPost}
              disabled={texto.length > 0 ? false : true}
              type="submit"
            >
              Publicar
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ModalCreatePost;
