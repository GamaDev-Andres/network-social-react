import React from "react";
import {
  Switch,
  BrowserRouter as Router,
  Redirect,
  Route,
} from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Home from "../components/home/Home";
import HomeRouter from "./HomeRouter";
const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/" component={HomeRouter} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
