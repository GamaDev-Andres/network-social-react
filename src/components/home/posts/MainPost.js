import React from "react";

const MainPost = ({ texto }) => {
  return (
    <div className="main-post-container">
      <div className="text-post-container">
        <p>{texto}</p>
      </div>
      {/* futuro contenedor imagen */}
    </div>
  );
};

export default MainPost;
