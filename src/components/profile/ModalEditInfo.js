import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import { Col, Form, Row } from "react-bootstrap";
import moment from "moment";
import Swal from "sweetalert2";

import { auth } from "../../firebase/credentials";
import HeaderPost from "../home/posts/HeaderPost";
import { closeModalInfo } from "../../actions/ui";
import useForm from "../../hooks/useForm";
import { startEditInfoUser } from "../../actions/profile";

Modal.setAppElement("#root");

const ModalEditInfo = () => {
  const foto = auth.currentUser.photoURL;
  const max = moment().format("YYYY-MM-DD");
  const minimo = moment().subtract(100, "years").format("YYYY-MM-DD");

  const dispatch = useDispatch();
  const { displayName, uid, email } = useSelector((state) => state.auth);
  const { openModalInfo } = useSelector((state) => state.ui);
  const [formValues, setFormValues, reset] = useForm({
    cumpleaños: max,
    genero: "",
    telefono: "",
    residencia: "",
    relacion: "",
  });
  const { telefono, relacion, cumpleaños, genero, residencia } = formValues;

  const handleSubmitPost = (e) => {
    e.preventDefault();

    dispatch(startEditInfoUser(email, formValues)).then(() => {
      reset();
      handleCloseModal();
      Swal.fire("Listo", "informacion editada exitosamente", "success");
    });
  };

  const handleCloseModal = () => {
    dispatch(closeModalInfo());
  };

  return (
    <>
      <Modal
        className="modal box animate__animated animate__bounceInUp animate__fast"
        isOpen={openModalInfo}
        onRequestClose={handleCloseModal}
        closeTimeoutMS={100}
      >
        <div className="container-title">
          <h2>Edita tu informacion</h2>
          <button onClick={handleCloseModal}>
            <AiOutlineClose />
          </button>
        </div>
        <div className="container-form-modal">
          <HeaderPost data={{ displayName, foto, uid }} />
          <form onSubmit={handleSubmitPost} className="form-modal">
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Lugar de Residencia</Form.Label>
              <Form.Control
                onChange={setFormValues}
                value={residencia}
                name="residencia"
                type="text"
                autoComplete="country"
                placeholder="Ingresa ciudad"
              />
            </Form.Group>
            <Row>
              <Form.Group as={Col} controlId="formGroupPassword">
                <Form.Label>Genero</Form.Label>
                <Form.Select
                  onChange={setFormValues}
                  value={genero}
                  name="genero"
                  autoComplete="sex"
                >
                  <option value="">Escoge...</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formGroupPassword">
                <Form.Label>Estado civil</Form.Label>
                <Form.Select
                  onChange={setFormValues}
                  value={relacion}
                  name="relacion"
                  type="select"
                >
                  <option value="">Escoge...</option>
                  <option value="Unión libre">Unión libre</option>
                  <option value="Casad@">Casad@</option>
                  <option value="Separad@">Separad@</option>
                  <option value="Solter@">Solter@</option>
                  <option value="Viud@">Viud@</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formGroupPassword">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  onChange={setFormValues}
                  value={cumpleaños}
                  name="cumpleaños"
                  type="date"
                  min={minimo}
                  max={max}
                  autoComplete="bday"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGroupPassword">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  onChange={setFormValues}
                  value={telefono}
                  name="telefono"
                  type="tel"
                  autoComplete="tel"
                />
              </Form.Group>
            </Row>
            <button onClick={handleSubmitPost} type="submit">
              Editar
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ModalEditInfo;
