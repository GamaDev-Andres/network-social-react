import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

import { startRegisterWithEmailAndPassword } from "../../actions/auth";
import { validador } from "../../helpers/validator";
import useForm from "../../hooks/useForm";

const initialForm = {
  name: "andres gama",
  nacimiento: new Date().getTime(),
  email: "gama_pipe@hotmail.com",
  password: "12345678",
  confirmPassword: "12345678",
};

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formValues, setFormValue] = useForm(initialForm);
  const { name, email, password, confirmPassword } = formValues;

  const volverLogin = () => {
    history.push("/login");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // validaciones
    if (!validador("email", email, "email")) {
      return;
    }
    if (!validador("string", name, "nombre")) {
      return;
    }
    if (!validador("string", password, "password")) {
      return;
    }
    if (password !== confirmPassword) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }
    dispatch(startRegisterWithEmailAndPassword(formValues));
  };
  return (
    <div className="auth__container">
      <div className="main-container animate__animated animate__fadeIn animate__slow">
        <div>
          <h2>Registrarse</h2>
          <div className="form-container">
            <form onSubmit={handleRegister}>
              <label htmlFor="name">Nombre</label>
              <input
                onChange={setFormValue}
                value={name}
                name="name"
                type="text"
                id="name"
                placeholder="Ingresa tu nombre"
                autoComplete="off"
                autoFocus
              />

              <label htmlFor="email">Correo</label>
              <input
                onChange={setFormValue}
                value={email}
                name="email"
                type="email"
                id="email"
                placeholder="Ingresa tu correo"
                autoComplete="email"
              />
              <label htmlFor="password">Contraseña</label>
              <input
                onChange={setFormValue}
                value={password}
                type="password"
                name="password"
                id="password"
                placeholder="contraseña"
                maxLength="20"
                autoComplete="new-password"
              />
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <input
                onChange={setFormValue}
                value={confirmPassword}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirme su contraseña"
                autoComplete="new-password"
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
