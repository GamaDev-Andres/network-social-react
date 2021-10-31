import React, { useState } from "react";
import { Link } from "react-router-dom";
import userEmpty from "../../assets/userEmpty.jpg";
const SectionFriends = () => {
  const [friends, setFriends] = useState([12, 23, 34, 45, 56, 67]);
  return (
    <section className="main-container-section-friends">
      <div className="container-friends">
        <h2>Amigos</h2>
        <div className="container-grid-friends">
          <div className="friends">
            {friends.map((friend) => (
              <div className="friend" key={friend}>
                <div className="img-friend">
                  <img src={userEmpty} alt="imagen de amigo" />
                </div>
                <Link to="/">Juanito</Link>
              </div>
            ))}
          </div>
          <button type="button">Ver todos</button>
        </div>
      </div>
    </section>
  );
};

export default SectionFriends;
