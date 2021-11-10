import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { VscHome } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { MdPersonSearch } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { useSelector } from "react-redux";

import { startLogOut } from "../../actions/auth";

const Nav = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const handleLogOut = () => {
    dispatch(startLogOut());
  };
  return (
    <nav className="nav">
      <div className="container-nav">
        <div className="container-logo">
          <h1>
            <strong>Net</strong>Book
          </h1>
        </div>
        <div className="container-enlaces">
          <NavLink exact to="/" activeClassName="active-link">
            <VscHome /> <span>Inicio</span>
          </NavLink>
          <NavLink
            exact
            to={`/perfil/${auth.uid}`}
            activeClassName="active-link"
          >
            <CgProfile />
            <span>Perfil</span>
          </NavLink>
          <NavLink exact to="/busqueda" activeClassName="active-link">
            <MdPersonSearch />
            <span>Busca Amigos</span>
          </NavLink>
          <button onClick={handleLogOut}>
            <BiLogOut />
            <span>Cerrar sesion</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
