import React from "react";
import FooterPost from "./FooterPost";
import HeaderPost from "./HeaderPost";
import MainPost from "./MainPost";

const Posts = ({ id }) => {
  return (
    <div className="container-post box">
      <HeaderPost idPost={id} />
      <MainPost idPost={id} />
      <FooterPost idPost={id} />
    </div>
  );
};

export default Posts;
