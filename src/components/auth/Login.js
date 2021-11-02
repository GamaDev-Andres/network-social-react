import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { startLogin, startLoginWithGoogle } from "../../actions/auth";
import useForm from "../../hooks/useForm";

const initialForm = {
  email: "gama_pipe@hotmail.com",
  password: "12345678",
};

const Login = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValue] = useForm(initialForm);

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(startLogin(email, password));
  };

  const handleLoginWithGoogle = () => {
    dispatch(startLoginWithGoogle());
  };

  return (
    <div className="auth__container">
      <div className="main-container animate__animated animate__fadeIn animate__slow">
        <div>
          <h2>Login</h2>
          <div className="form-container">
            <form onSubmit={handleLogin}>
              <label htmlFor="email">Correo</label>
              <input
                value={email}
                onChange={setFormValue}
                name="email"
                type="email"
                id="email"
                placeholder="Ingresa tu correo"
                autoFocus
                autoComplete="email"
              />
              <label htmlFor="password">Contraseña</label>
              <input
                value={password}
                onChange={setFormValue}
                type="password"
                name="password"
                id="password"
                placeholder="contraseña"
                autoComplete="current-password"
              />
              <button type="submit">Ingresar</button>
              <div className="btn-icon-container">
                <button onClick={handleLoginWithGoogle} type="button">
                  <FcGoogle className="icon-google" /> Ingresa con google
                </button>
              </div>
              <Link to="/register">Crear cuenta</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
