import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Posts from "../home/posts/Posts";
import Header from "../layout/Header";

const SectionPostsProfile = () => {
  const { posts } = useSelector((state) => state.profileVisited);
  const auth = useSelector((state) => state.auth);
  const { uid } = useParams();

  return (
    <section className="main-container-posts-profile">
      {auth.uid === uid && <Header />}
      {posts ? (
        <main className="posts-user-profile">
          {posts.map((post) => (
            <Posts post={post} key={post.id} />
          ))}
        </main>
      ) : (
        <h2>wait</h2>
      )}
    </section>
  );
};

export default SectionPostsProfile;
