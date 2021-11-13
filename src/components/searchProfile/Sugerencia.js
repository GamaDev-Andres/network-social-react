import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import userEmpty from "../../assets/userEmpty.jpg";
import { startAddFriend, startDeleteFriend } from "../../actions/friends";

const Sugerencia = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth);
  const amigos = useSelector((state) => state.amigos);
  const [loading, setLoading] = useState(true);
  const { displayName, foto, uid } = user;

  const handleClickRedirect = () => {
    history.push(`/perfil/${uid}`);
  };

  const handleAddOrDeleteFriend = () => {
    setLoading(false);
    if (amigos.some((amigo) => amigo.uid === uid)) {
      dispatch(startDeleteFriend(email, user)).then(() => {
        setLoading(true);
      });
      return;
    }
    delete user.id;

    dispatch(startAddFriend(email, user)).then(() => {
      setLoading(true);
    });
  };
  useEffect(() => {
    return () => {
      setLoading(true);
    };
  }, []);
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
            <>
              <button
                className="boton-sugerencia sug-add"
                disabled={
                  amigos?.some((amigo) => amigo.uid === uid) ? true : false
                }
                onClick={handleAddOrDeleteFriend}
              >
                {amigos.some((amigo) => amigo.uid === uid)
                  ? "Agregado"
                  : "Agregar"}
              </button>
              <button
                className="boton-sugerencia sug-add"
                disabled={
                  amigos?.some((amigo) => amigo.uid === uid) ? false : true
                }
                onClick={handleAddOrDeleteFriend}
              >
                Eliminar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sugerencia;
