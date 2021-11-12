import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";

import userEmpty from "../../assets/userEmpty.jpg";
import poster from "../../assets/poster.jpg";
import { useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { startAddFriend, startDeleteFriend } from "../../actions/friends";

const HeaderProfile = () => {
  const profileVisited = useSelector((state) => state.profileVisited);
  const { displayName, uid, foto, email } = profileVisited;
  const user = { displayName, uid, foto, email };

  const amigos = useSelector((state) => state.amigos);
  const { email: authEmail, uid: authUid } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const handleAddOrDeleteFriend = () => {
    setLoading(false);
    if (amigos.some((amigo) => amigo.uid === uid)) {
      dispatch(startDeleteFriend(authEmail, user)).then(() => {
        setLoading(true);
      });
      return;
    }
    delete user.id;
    dispatch(startAddFriend(authEmail, user)).then(() => {
      setLoading(true);
    });
  };

  return (
    <div className="container-header-profile box">
      <div className="container-fotos">
        <img className="img-poster" src={poster} alt="imagen poster perfil" />
        <div className="container-foto-profile">
          <div>
            <img src={foto || userEmpty} alt="foto de andres gama" />
            <button>
              <FaCamera />
            </button>
          </div>
        </div>
        <div className="container-button-poster">
          <button>
            <FaCamera />
          </button>
        </div>
      </div>
      <h1>{displayName}</h1>
      {authUid !== uid && (
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
      )}
    </div>
  );
};

export default HeaderProfile;
