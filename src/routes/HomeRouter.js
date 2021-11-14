import { collection, onSnapshot } from "@firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";

import { addFriendAction } from "../actions/friends";
import { StartGetAllUsers } from "../actions/users";
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
  const { email, uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(StartGetAllUsers(uid));
  }, [dispatch, uid]);

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
