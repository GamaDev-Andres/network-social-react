import React, { useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import { useHistory } from "react-router";

import { closeModal } from "../../../actions/ui";
import useForm from "../../../hooks/useForm";
import HeaderPost from "./HeaderPost";
import { startCreatePost, startEditPost } from "../../../actions/posts";
import { auth } from "../../../firebase/credentials";

Modal.setAppElement("#root");

const ModalCreatePost = () => {
  let posts;

  const foto = auth.currentUser.photoURL;
  const dispatch = useDispatch();
  const { displayName, uid } = useSelector((state) => state.auth);
  const primerNombre = displayName?.split(" ")[0];
  const history = useHistory();
  const postsHome = useSelector((state) => state.posts);
  const postsProfile = useSelector((state) => state.profileVisited);
  const { openModal, edit } = useSelector((state) => state.ui);
  const [formValues, setFormValue, reset] = useForm({
    texto: "",
  });

  const { texto } = formValues;

  if (history.location.pathname === "/") {
    posts = postsHome;
  } else {
    posts = postsProfile?.posts;
  }

  const handleCloseModal = () => {
    reset({ texto: "" });
    dispatch(closeModal());
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (edit) {
      dispatch(startEditPost(texto, edit)).then(() => {
        Swal.fire("Listo!", "Editado exitosamente", "success");
      });
    } else {
      dispatch(startCreatePost(texto)).then(() => {
        Swal.fire("Listo!", "Creado exitosamente", "success");
      });
    }
    handleCloseModal();
  };

  useEffect(() => {
    if (edit) {
      const postEdit = posts.find((post) => post.id === edit);
      reset({ texto: postEdit.texto });
    } else {
      reset({ texto: "" });
    }
  }, [edit, reset, posts]);

  return (
    <>
      <Modal
        className="modal box animate__animated animate__bounceInUp animate__fast"
        isOpen={openModal}
        onRequestClose={handleCloseModal}
        closeTimeoutMS={100}
      >
        <div className="container-title">
          <h2>{edit ? "Edita tu publicacion" : "Crea tu publicacion"}</h2>
          <button onClick={handleCloseModal}>
            <AiOutlineClose />
          </button>
        </div>
        <div className="container-form-modal">
          <HeaderPost data={{ displayName, foto, uid }} />
          <form onSubmit={handleSubmitPost} className="form-modal">
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
              disabled={texto.trim().length > 0 ? false : true}
              type="submit"
            >
              {edit ? "Editar" : "Publicar"}
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ModalCreatePost;
