import React, { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { ImSearch } from "react-icons/im";

import Sugerencia from "./Sugerencia";

const SearchProfile = () => {
  const users = useSelector((state) => state.users);
  const [search, setsearch] = useState("");
  const [searchUsers, setsearchUsers] = useState(null);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      Swal.fire("Error", "El campo no puede estar vacio", "error").then(() => {
        setsearchUsers(users);
        setsearch("");
      });
      return;
    }

    const resultsSearch = users.filter((user) =>
      user.displayName.toLowerCase().includes(search.toLowerCase())
    );

    if (resultsSearch.length === 0) {
      Swal.fire("Error", "No hay coincidencias con su busqueda", "error").then(
        () => {
          setsearchUsers(users);

          setsearch("");
        }
      );
      return;
    }
    setsearchUsers(resultsSearch);
    setsearch("");
  };

  return (
    <div className="main-container-searchprofile box">
      <div className="container-search-profile">
        <h3>Personas que quizá conozcas</h3>
        <div className="container-buscador">
          <form onSubmit={handleSubmitSearch}>
            <input
              name="search"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              type="search"
              placeholder="Buscar usuario..."
              autoComplete="off"
            />
            <button type="submit" className="btn">
              <ImSearch />
            </button>
          </form>
        </div>
        {users.length > 0 ? (
          <div className="container-sugerencias">
            {(searchUsers || users).map((user) => (
              <Sugerencia key={user.uid} user={user} />
            ))}
          </div>
        ) : (
          <div className="box posts-empty">
            <h4>No tenemos usuarios que sugerirte.</h4>
            <p>Invita a tus amigos a NetBook!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchProfile;
