import React from "react";
import FooterPost from "./FooterPost";
import HeaderPost from "./HeaderPost";
import MainPost from "./MainPost";

const Posts = ({ post }) => {
  const { displayName, userData, id, texto, fechaCreacion } = post;
  return (
    <div className="container-post box">
      <HeaderPost
        user={userData}
        foto={userData.foto}
        fechaCreacion={fechaCreacion}
      />
      <MainPost texto={texto} />
      <FooterPost idPost={id} />
    </div>
  );
};

export default Posts;
