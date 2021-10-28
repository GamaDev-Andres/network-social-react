import { onAuthStateChanged } from "@firebase/auth";
import React, { useEffect, useState } from "react";
import { Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import Register from "../components/auth/Register";
import { auth, db } from "../firebase/credentials";
import HomeRouter from "./HomeRouter";
import { login } from "../actions/auth";
import Login from "../components/auth/Login";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import { collection, doc, getDoc, setDoc } from "@firebase/firestore";

const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const observandoAutenticacion = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid, displayName, email } = user;
          dispatch(login(uid, email, displayName));
          creandoDocUser(user);
        }
        setChecking(false);
      });
    };
    // ----------------------------CORREGIR, OPTIMIZAR
    const creandoDocUser = async (user) => {
      const { uid, displayName, email } = user;
      const docRef = doc(db, "usuarios", user.email);
      console.log(docRef);
      const refCollection = collection(db, `usuarios/${email}/mensajes`);
      const response = await getDoc(docRef);
      if (!response.exists()) {
        // setDoc(docRef, { uid, displayName, email });
      }
      // collection
      setDoc(doc(refCollection, email), { hola: uid });
    };

    observandoAutenticacion();
  }, [dispatch]);

  if (checking) {
    return (
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
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
