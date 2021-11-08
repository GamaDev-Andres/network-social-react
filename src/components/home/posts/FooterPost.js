import React, { useState } from "react";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { BsChatRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { startToggleLike } from "../../../actions/posts";
import { useSelector } from "react-redux";
import { openModalComents, openModalLikes } from "../../../actions/ui";

const FooterPost = ({ idPost, arrlikes }) => {
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
        <span onClick={handleComent}>4 comentarios</span>
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
