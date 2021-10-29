import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "@firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { clearPosts, createPost } from "../../actions/posts";
import { db } from "../../firebase/credentials";

import Header from "../layout/Header";
import ModalCreatePost from "./posts/ModalCreatePost";
import Posts from "./posts/Posts";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const postsOrdenados = posts.sort((a, b) => {
    return b.fechaCreacion - a.fechaCreacion;
  });
  useEffect(() => {
    // actualizaciones de los posts en tiempo real firestore
    const refCollection = collection(db, `usuarios`);
    const unsubscribe = onSnapshot(
      refCollection,
      (querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          const ref = collection(db, `${doc.ref.path}/posts`);
          const docs = await getDocs(ref);

          docs.forEach((doc) => {
            console.log(doc.data());
            const post = doc.data();
            dispatch(createPost({ ...post, id: doc.id }));
          });
        });
      },
      (error) => {
        console.log("ERROR AL ESCUCHAR");
        console.log(error);
      }
    );

    return () => {
      unsubscribe();
      dispatch(clearPosts());
    };
  }, []);
  return (
    <div id="container-home">
      <Header />
      <main>
        <div className="container-all-posts">
          {postsOrdenados.length > 0 ? (
            postsOrdenados.map((post) => <Posts post={post} key={post.id} />)
          ) : (
            <h2>no hay posts</h2>
          )}
        </div>
      </main>
      <ModalCreatePost />
    </div>
  );
};

export default Home;
