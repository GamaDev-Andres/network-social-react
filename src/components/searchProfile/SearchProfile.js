import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { StartGetAllUsers } from "../../actions/users";
import Sugerencia from "./Sugerencia";

const SearchProfile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const users = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(StartGetAllUsers()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  if (loading) <h1>loading...</h1>;
  return (
    <div className="main-container-searchprofile box">
      <div className="container-search-profile">
        <h3>Personas que quizá conozcas</h3>
        <div className="container-sugerencias">
          {users.map((user) => (
            <Sugerencia key={user.uid} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchProfile;
