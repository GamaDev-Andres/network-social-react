import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeModalFriends } from "../../actions/ui";
import Sugerencia from "../searchProfile/Sugerencia";

const ModalFriends = () => {
  const dispatch = useDispatch();
  const { openModalFriends } = useSelector((state) => state.ui);
  const profileVisited = useSelector((state) => state.profileVisited);
  const { friends } = profileVisited;

  const handleCloseModal = () => {
    dispatch(closeModalFriends());
  };
  return (
    <>
      <Modal
        className="modal box animate__animated animate__bounceInUp animate__fast"
        isOpen={openModalFriends}
        onRequestClose={handleCloseModal}
        closeTimeoutMS={100}
      >
        <div className="main-container-modal-friends">
          <div className="container-title">
            <h2>Amigos</h2>
            <button onClick={handleCloseModal}>
              <AiOutlineClose />
            </button>
          </div>
          <div className="container-modal-friends">
            {friends.map((friend) => (
              <Sugerencia key={friend.id} user={friend} />
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalFriends;
