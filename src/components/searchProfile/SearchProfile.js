import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { StartGetAllUsers } from "../../actions/users";
import Sugerencia from "./Sugerencia";
import { ImSearch } from "react-icons/im";
const SearchProfile = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);
  const [search, setsearch] = useState("");
  const [searchUsers, setsearchUsers] = useState(null);
  useEffect(() => {
    dispatch(StartGetAllUsers(uid));
  }, [dispatch, uid]);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      setsearchUsers(users);
      setsearch("");
      return;
    }
    console.log(search);
    const resultsSearch = users.filter((user) =>
      user.displayName.includes(search)
    );
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
        <div className="container-sugerencias">
          {(searchUsers || users).map((user) => (
            <Sugerencia key={user.uid} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchProfile;
