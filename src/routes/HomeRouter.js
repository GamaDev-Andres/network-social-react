import React from "react";
import { Route, Switch } from "react-router";
import Home from "../components/home/Home";
import Nav from "../components/layout/Nav";
import Profile from "../components/profile/Profile";

const HomeRouter = () => {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/perfil" component={Profile} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default HomeRouter;
