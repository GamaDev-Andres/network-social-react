import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { clearPosts, createPost, getAllPosts } from "../../actions/posts";
import { db } from "../../firebase/credentials";
import { mapeoDocsPostsAObjetos } from "../../helpers/firebase";

import Header from "../layout/Header";
import ModalCreatePost from "./posts/ModalCreatePost";
import Posts from "./posts/Posts";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  // const postsOrdenados = posts.sort((a, b) => {
  //   return b.fechaCreacion - a.fechaCreacion;
  // });
  useEffect(() => {
    // actualizaciones de los posts en tiempo real firestore
    // const refCollection = collection(db, `usuarios`);
    const refCollection = collection(db, `posts`);
    const q = query(refCollection, orderBy("fechaCreacion", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const posts = mapeoDocsPostsAObjetos(querySnapshot.docs);
        dispatch(getAllPosts(posts));
        // querySnapshot.forEach(async (doc) => {

        // const ref = collection(db, `${doc.ref.path}/posts`);
        // const docs = await getDocs(ref);

        // docs.forEach((doc) => {
        //   console.log(doc.data());
        //   const post = doc.data();
        //   dispatch(getAllPosts({ ...post, id: doc.id }));
        // });
        // });
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
      <ModalCreatePost />
    </div>
  );
};

export default Home;
