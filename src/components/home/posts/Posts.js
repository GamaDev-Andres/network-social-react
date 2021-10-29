import React from "react";
import FooterPost from "./FooterPost";
import HeaderPost from "./HeaderPost";
import MainPost from "./MainPost";

const Posts = ({ post }) => {
  const { displayName, foto, id, texto, fechaCreacion, uid } = post;
  return (
    <div className="container-post box">
      <HeaderPost data={{ displayName, foto, fechaCreacion, uid }} />
      <MainPost texto={texto} />
      <FooterPost idPost={id} />
    </div>
  );
};

export default Posts;
