import { collection, onSnapshot } from "@firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";

import { addFriendAction } from "../actions/friends";
import Home from "../components/home/Home";
import ModalCreatePost from "../components/home/posts/ModalCreatePost";
import Nav from "../components/layout/Nav";
import Profile from "../components/profile/Profile";
import SearchProfile from "../components/searchProfile/SearchProfile";
import { db } from "../firebase/credentials";
import { mapeoDocsPostsAObjetos } from "../helpers/firebase";

const HomeRouter = () => {
  const { email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    // ESCUCHANDO AMIGOS
    const refCollectionFriends = collection(db, `usuarios/${email}/amigos`);
    const unsubcribeFriends = onSnapshot(
      refCollectionFriends,
      (querySnapshot) => {
        const friends = mapeoDocsPostsAObjetos(querySnapshot.docs);
        dispatch(addFriendAction(friends));
      }
    );
    return () => {
      unsubcribeFriends();
    };
  }, [email, dispatch]);
  if (!auth.displayName) {
    return <h1>loading... por displayname</h1>;
  }
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/perfil/:uid" component={Profile} />
        <Route exact path="/busqueda" component={SearchProfile} />
        <Route exact path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
      <ModalCreatePost />
    </div>
  );
};

export default HomeRouter;
