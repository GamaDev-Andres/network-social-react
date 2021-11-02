import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import userEmpty from "../../assets/userEmpty.jpg";

const Friend = ({ friend }) => {
  const profileVisited = useSelector((state) => state.profileVisited);

  return (
    <div className="friend">
      <div className="img-friend">
        <img
          src={friend.foto || userEmpty}
          alt={`imagen de ${profileVisited.displayName}`}
        />
      </div>
      <Link exact="true" to={`/perfil/${friend.uid}`}>
        {friend.displayName}
      </Link>
    </div>
  );
};

export default Friend;
