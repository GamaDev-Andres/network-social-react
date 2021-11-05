import React, { useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";

const Options = ({ children, uid }) => {
  const menu = useRef();
  const auth = useSelector((state) => state.auth);

  const handleOpenMenu = () => {
    menu.current.classList.toggle("oculto");
  };

  return (
    auth.uid === uid && (
      <div className="container-options">
        <BsThreeDots onClick={handleOpenMenu} className="icon-options" />
        <div ref={menu} className="container-items-options oculto">
          {children}
        </div>
      </div>
    )
  );
};

export default Options;
