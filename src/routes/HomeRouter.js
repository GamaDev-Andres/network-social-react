import { collection, doc, onSnapshot } from "@firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { login } from "../actions/auth";

import { addFriendAction } from "../actions/friends";
import Home from "../components/home/Home";
import ModalCreatePost from "../components/home/posts/ModalCreatePost";
import ModalViewComents from "../components/home/posts/ModalViewComents";
import ModalViewLikes from "../components/home/posts/ModalViewLikes";
import Nav from "../components/layout/Nav";
import ModalEditInfo from "../components/profile/ModalEditInfo";
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

    // ESCUCHAR DATA USUARIO
    const refUser = doc(db, "usuarios", email);
    const unsubscribeUser = onSnapshot(refUser, (documento) => {
      const dataUser = documento.data();
      dispatch(login(dataUser));
    });
    return () => {
      unsubcribeFriends();
      unsubscribeUser();
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
      <ModalEditInfo />
      <ModalViewLikes />
      <ModalViewComents />
    </div>
  );
};

export default HomeRouter;
