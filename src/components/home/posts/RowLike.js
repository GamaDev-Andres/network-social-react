import moment from "moment";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { closeModalLikes } from "../../../actions/ui";
import userEmpty from "../../../assets/userEmpty.jpg";

const RowLike = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const fechaReaccion = moment(user.fechaReaccion).fromNow();
  const handleRedirectProfile = () => {
    dispatch(closeModalLikes());

    history.push(`/perfil/${user.uid}`);
  };

  return (
    <div className="row-container-like">
      <div onClick={handleRedirectProfile} className="container-img-like">
        <img
          src={user.foto ? user.foto : userEmpty}
          alt={`imagen de ${user.displayName}`}
        />
      </div>
      <div className="container-info-like">
        <h3 onClick={handleRedirectProfile}>{user.displayName}</h3>
        <small>{fechaReaccion}</small>
      </div>
    </div>
  );
};

export default RowLike;
