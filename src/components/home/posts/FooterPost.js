import React from "react";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { BsChatRight } from "react-icons/bs";

const FooterPost = () => {
  return (
    <div className="footer-post-container">
      <div className="footer-post-indicadores-container">
        <span>
          <FcLike /> 3
        </span>
        <span>4 comentarios</span>
      </div>
      <div className="footer-post-interacciones-container">
        <button>
          <AiOutlineHeart />
          <span>Me gusta</span>
        </button>
        <button>
          <BsChatRight /> Comentar
        </button>
      </div>
    </div>
  );
};

export default FooterPost;
