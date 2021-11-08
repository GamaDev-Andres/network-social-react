import { collection, onSnapshot } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/credentials";
import { mapeoDocsPostsAObjetos } from "../../../helpers/firebase";

import FooterPost from "./FooterPost";
import HeaderPost from "./HeaderPost";
import MainPost from "./MainPost";

const Posts = ({ post }) => {
  const { displayName, foto, id, texto, fechaCreacion, uid } = post;
  const [arrlikes, setArrlikes] = useState([]);
  useEffect(() => {
    // escuchar cambios en reacciones del post
    const refCollectionLikes = collection(db, `posts/${id}/likes`);
    const unsubscribeLikes = onSnapshot(refCollectionLikes, (querySnaphots) => {
      const arrLikesOfDocs = mapeoDocsPostsAObjetos(querySnaphots.docs);
      setArrlikes(arrLikesOfDocs);
    });
    return () => {
      unsubscribeLikes();
    };
  }, []);
  return (
    <div className="container-post box">
      <HeaderPost data={{ displayName, foto, fechaCreacion, uid, id }} />
      <MainPost texto={texto} />
      <FooterPost idPost={id} arrlikes={arrlikes} />
    </div>
  );
};

export default Posts;
