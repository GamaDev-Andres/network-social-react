import Swal from "sweetalert2";
import validator from "validator";

export const validador = (type, dato, nameDate) => {
  switch (type) {
    case "email":
      return validateEmail(dato, nameDate);

    case "string":
      return validateString(dato, nameDate);

    default:
      break;
  }
};

function validateEmail(email, nameDate) {
  if (!validator.isEmail(email)) {
    Swal.fire("Error", `${nameDate} invalido`, "error");
    return false;
  }
  return true;
}

function validateString(string, nameDate) {
  if (validator.isEmpty(string)) {
    Swal.fire("Error", `${nameDate} no puede ir vacio`, "error");
    return false;
  }
  if (!validator.isLength(string, { min: 6, max: 40 })) {
    Swal.fire("Error", ` ${nameDate} debe tener minimo 6 caracteres`, "error");
    return false;
  }
  return true;
}
