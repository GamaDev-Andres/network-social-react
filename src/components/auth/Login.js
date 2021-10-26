import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="auth__container">
      <div className="main-container">
        <div>
          <h2>Login</h2>
          <div className="form-container">
            <form>
              <label htmlFor="email">Correo</label>
              <input
                name="email"
                type="email"
                id="email"
                placeholder="Ingresa tu correo"
              />
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="contraseña"
              />
              <button type="submit">Ingresar</button>
              <div className="btn-icon-container">
                <button type="button">
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
