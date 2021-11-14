import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { clearPosts, getAllPosts } from "../../actions/posts";
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
  const [loader, setLoader] = useState(true);
  const userSugeridos = users.filter(
    (user) => !amigos.some((amigo) => amigo.uid === user.uid)
  );

  useEffect(() => {
    // ESCUCHANDO POSTS
    const refCollection = collection(db, `posts`);
    const q = query(refCollection, orderBy("fechaCreacion", "desc"));
    const unsubscribePosts = onSnapshot(q, (querySnapshot) => {
      setLoader(true);
      const posts = mapeoDocsPostsAObjetos(querySnapshot.docs);
      dispatch(getAllPosts(posts));
      setLoader(false);
    });

    return () => {
      unsubscribePosts();
      dispatch(clearPosts());
    };
  }, [dispatch]);

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
                  Ve y mira tus amigos en NetBook.
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
            {!loader ? (
              posts.length > 0 ? (
                posts.map((post) => <Posts post={post} key={post.id} />)
              ) : (
                <div className="box posts-empty">
                  <h4>Aun no hay publicaciones hechas por usuarios</h4>
                  <p>Sé el primero en publicar algo !!</p>
                </div>
              )
            ) : (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
