import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearPosts, getAllPosts } from "../../actions/posts";
import { StartGetAllUsers } from "../../actions/users";
import { db } from "../../firebase/credentials";
import { mapeoDocsPostsAObjetos } from "../../helpers/firebase";

import Header from "../layout/Header";
import Sugerencia from "../searchProfile/Sugerencia";
import Posts from "./posts/Posts";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const { uid } = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);
  const amigos = useSelector((state) => state.amigos);
  const userSugeridos = users.filter(
    (user) => !amigos.some((amigo) => amigo.uid === user.uid)
  );
  useEffect(() => {
    // ESCUCHANDO POSTS
    const refCollection = collection(db, `posts`);
    const q = query(refCollection, orderBy("fechaCreacion", "desc"));
    const unsubscribePosts = onSnapshot(q, (querySnapshot) => {
      const posts = mapeoDocsPostsAObjetos(querySnapshot.docs);
      dispatch(getAllPosts(posts));
    });

    return () => {
      unsubscribePosts();
      dispatch(clearPosts());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(StartGetAllUsers(uid));
  }, [dispatch, uid]);

  return (
    <div id="main-container-page-home">
      <aside className="box">
        <div className="container-aside">
          <h4>Sugerencias de amistad</h4>
          <div className="container-sugerencias">
            {userSugeridos.length !== 0 ? (
              userSugeridos.map((user) => (
                <Sugerencia user={user} key={`sugHome${user.uid}`} />
              ))
            ) : (
              <div className="no-users">
                <p>
                  No hay usuarios para sugerirte, inivita a tus amigos a NetBook
                </p>
                <Link to={`/perfil/${uid}`}>
                  Ve y mira tus amigos en NetNook.
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>

      <div id="container-home">
        <Header />
        <main>
          <div className="container-all-posts">
            {posts.length > 0 ? (
              posts.map((post) => <Posts post={post} key={post.id} />)
            ) : (
              <div className="sk-fading-circle">
                <div className="sk-circle1 sk-circle"></div>
                <div className="sk-circle2 sk-circle"></div>
                <div className="sk-circle3 sk-circle"></div>
                <div className="sk-circle4 sk-circle"></div>
                <div className="sk-circle5 sk-circle"></div>
                <div className="sk-circle6 sk-circle"></div>
                <div className="sk-circle7 sk-circle"></div>
                <div className="sk-circle8 sk-circle"></div>
                <div className="sk-circle9 sk-circle"></div>
                <div className="sk-circle10 sk-circle"></div>
                <div className="sk-circle11 sk-circle"></div>
                <div className="sk-circle12 sk-circle"></div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
