import { onAuthStateChanged } from "@firebase/auth";
import React, { useEffect, useState } from "react";
import { Switch, HashRouter as Router, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";

import Register from "../components/auth/Register";
import { auth } from "../firebase/credentials";
import HomeRouter from "./HomeRouter";
import { login } from "../actions/auth";
import Login from "../components/auth/Login";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const observandoAutenticacion = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid, displayName, email } = user;
          dispatch(login({ uid, email, displayName }));
        }
        setChecking(false);
      });
    };

    observandoAutenticacion();
  }, [dispatch]);

  if (checking) {
    return (
      <div className="spinner-router">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Router>
      <div>
        <Switch>
          <PrivateRouter exact path="/login" component={Login} />
          <PrivateRouter exact path="/register" component={Register} />
          <PublicRouter path="/" component={HomeRouter} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
