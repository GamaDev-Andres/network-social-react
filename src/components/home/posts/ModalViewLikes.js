import React from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";

import { closeModalLikes } from "../../../actions/ui";
import RowLike from "./RowLike";

Modal.setAppElement("#root");

const ModalViewLikes = () => {
  const { openModalLikes } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const handleCloseModalLike = () => {
    dispatch(closeModalLikes());
  };

  return (
    <>
      <Modal
        className="modal box animate__animated animate__bounceInUp animate__fast"
        isOpen={openModalLikes?.open}
        onRequestClose={handleCloseModalLike}
        closeTimeoutMS={100}
      >
        <div className="main-container-modal-likes">
          <div className="container-title">
            <h2>Reacciones</h2>
            <button onClick={handleCloseModalLike}>
              <AiOutlineClose />
            </button>
          </div>
          {openModalLikes?.data?.length === 0 && (
            <h3>Sé el primero en reaccionar</h3>
          )}
          {openModalLikes?.data?.map((like) => (
            <RowLike key={like.id} user={like} />
          ))}
        </div>
      </Modal>
    </>
  );
};

export default ModalViewLikes;
