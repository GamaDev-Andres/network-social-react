import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { clearUserVisited } from "../../actions/profile";
import userEmpty from "../../assets/userEmpty.jpg";

const Friend = ({ friend }) => {
  const profileVisited = useSelector((state) => state.profileVisited);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClick = () => {
    history.push(`/perfil/${friend.uid}`);
  };

  return (
    <div className="friend">
      <div className="img-friend">
        <img
          src={friend.foto || userEmpty}
          alt={`imagen de ${profileVisited.displayName}`}
        />
      </div>
      <span onClick={handleClick}>{friend.displayName}</span>
      <Link exact="true" to={`/perfil/${friend.uid}`}>
        {friend.displayName}
      </Link>
    </div>
  );
};

export default Friend;
