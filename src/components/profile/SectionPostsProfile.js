import React from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import Posts from "../home/posts/Posts";
import Header from "../layout/Header";

const SectionPostsProfile = () => {
  const { posts, displayName } = useSelector((state) => state.profileVisited);
  const auth = useSelector((state) => state.auth);
  const { uid } = useParams();

  return (
    <section className="main-container-posts-profile">
      {auth.uid === uid && <Header />}

      {posts ? (
        posts.length > 0 ? (
          <main className="posts-user-profile">
            {posts.map((post) => (
              <Posts post={post} key={post.id} />
            ))}
          </main>
        ) : (
          <div className="box posts-empty">
            <h4>
              {auth.uid === uid
                ? "Aún no has publicado algo."
                : `${displayName} aún no ha publicado algo.`}
            </h4>
            {auth.uid === uid && <p>realiza tu primer post!!</p>}
          </div>
        )
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </section>
  );
};

export default SectionPostsProfile;
