import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";

import HeaderProfile from "./HeaderProfile";
import MainProfile from "./MainProfile";
import { clearUserVisited, getUserProfileAction } from "../../actions/profile";

const Profile = () => {
  const { uid } = useParams();
  const dispatch = useDispatch();
  const profileVisited = useSelector((state) => state.profileVisited);
  const [checkingUser, setCheckingUser] = useState(true);

  useEffect(() => {
    function getUser() {
      dispatch(getUserProfileAction(uid)).then((res) => {
        setCheckingUser(false);
      });
    }

    getUser();
    return () => {
      dispatch(clearUserVisited());
    };
  }, [uid, dispatch]);

  if (!checkingUser && !profileVisited) {
    console.log(checkingUser);
    console.log(profileVisited);
    console.log("Url al que intento acceder no existe");
    // Swal.fire("Error", "Url al que intento acceder no existe", "error");
    // return <Redirect to="/" />;
  }

  return (
    profileVisited && (
      <div className="main-container-profile">
        <HeaderProfile />
        <MainProfile />
      </div>
    )
  );
};

export default Profile;
