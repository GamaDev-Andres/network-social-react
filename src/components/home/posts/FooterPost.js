import React from "react";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { BsChatRight } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

import { startToggleLike } from "../../../actions/posts";
import { openModalComents, openModalLikes } from "../../../actions/ui";

const FooterPost = ({ idPost, arrlikes, arrComents }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLike = () => {
    console.log("like");
    dispatch(startToggleLike(idPost));
  };

  const handleComent = () => {
    console.log("coment");
    dispatch(openModalComents({ idPost }));
  };

  const handleViewModalLikes = () => {
    dispatch(openModalLikes(arrlikes));
  };

  return (
    <div className="footer-post-container">
      <div className="footer-post-indicadores-container">
        <span onClick={handleViewModalLikes}>
          <FcLike /> {arrlikes.length}
        </span>
        <span onClick={handleComent}>{arrComents.length} comentarios</span>
      </div>
      <div className="footer-post-interacciones-container">
        <button
          onClick={handleLike}
          className={
            arrlikes.some((like) => like.id === auth.email) ? "like" : ""
          }
        >
          <AiOutlineHeart />
          <span>Me gusta</span>
        </button>
        <button onClick={handleComent}>
          <BsChatRight /> Comentar
        </button>
      </div>
    </div>
  );
};

export default FooterPost;
