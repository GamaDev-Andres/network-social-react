import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

const PrivateRouter = ({ component: Component, ...rest }) => {
  const uid = useSelector((state) => state.auth.uid);
  return (
    <Route {...rest}>{!uid ? <Component /> : <Redirect exact to="/" />}</Route>
  );
};

export default PrivateRouter;
