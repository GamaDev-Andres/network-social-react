import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import userEmpty from "../../assets/userEmpty.jpg";
import { startAddFriend } from "../../actions/friends";

const Sugerencia = ({ user }) => {
  const { displayName, foto, uid } = user;
  const history = useHistory();
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth);
  const amigos = useSelector((state) => state.amigos);
  const [loading, setLoading] = useState(true);

  const handleClickRedirect = () => {
    history.push(`/perfil/${uid}`);
  };

  const handleAddFriend = () => {
    delete user.id;
    setLoading(false);
    dispatch(startAddFriend(email, user)).then(() => {
      setLoading(true);
    });
  };

  return (
    <div className="main-container-sugerencia">
      <div onClick={handleClickRedirect} className="container-img-profile">
        <img src={foto || userEmpty} alt={`foto de ${displayName}`} />
      </div>
      <div className="container-info-sugerencia">
        <div className="container-info-user-sugerencia">
          <h3>
            <Link to={`/perfil/${uid}`}>{displayName}</Link>
          </h3>
        </div>
        <div className="container-buton-sugerencia">
          {!loading ? (
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </Button>
          ) : (
            <button onClick={handleAddFriend}>
              {amigos.some((amigo) => amigo.uid === uid)
                ? "Eliminar"
                : "Agregar"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sugerencia;
