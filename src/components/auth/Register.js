import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useHistory } from "react-router";
const Register = () => {
  const history = useHistory();
  const volverLogin = () => {
    history.push("/login");
  };
  return (
    <div className="auth__container">
      <div className="main-container">
        <div>
          <h2>Registrarse</h2>
          <div className="form-container">
            <form>
              <label htmlFor="name">Nombre</label>
              <input
                name="name"
                type="text"
                id="name"
                placeholder="Ingresa tu nombre"
              />
              <label htmlFor="fecha">Nacimiento</label>
              <input name="fecha" type="date" id="fecha" />
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
              <label htmlFor="passwordConfirm">Confirmar contraseña</label>
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                placeholder="Confirme su contraseña"
              />
              <button type="submit">Registrarse</button>
              <div className="btn-icon-container">
                <button onClick={volverLogin} type="button">
                  <BiArrowBack />
                  Volver a Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
