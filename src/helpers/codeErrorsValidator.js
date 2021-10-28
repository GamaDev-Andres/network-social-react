import Swal from "sweetalert2";

export const validatorErrors = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      Swal.fire("Error", "Ya existe una cuenta con ese email.", "error");
      break;
    case "auth/user-not-found":
      Swal.fire(
        "Error",
        "No se encontro un usuario con esas credenciales.",
        "error"
      );
      break;
    case "auth/wrong-password":
      Swal.fire("Error", "Contrasela incorrecta.", "error");
      break;
    case "auth/popup-closed-by-user":
      Swal.fire(
        "Atencion",
        "Cerraste la pestaña de google, abrela de nuevo para ingresar.",
        "warning"
      );
      break;

    default:
      break;
  }
};
