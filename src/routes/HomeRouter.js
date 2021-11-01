import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Home from "../components/home/Home";
import ModalCreatePost from "../components/home/posts/ModalCreatePost";
import Nav from "../components/layout/Nav";
import Profile from "../components/profile/Profile";
import SearchProfile from "../components/searchProfile/SearchProfile";

const HomeRouter = () => {
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
