import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPostsUserProfile } from "../../actions/profile";
import { db } from "../../firebase/credentials";
import { mapeoDocsPostsAObjetos } from "../../helpers/firebase";
import ModalCreatePost from "../home/posts/ModalCreatePost";
import SectionFriends from "./SectionFriends";
import SectionInforProfile from "./SectionInforProfile";
import SectionPostsProfile from "./SectionPostsProfile";

const MainProfile = () => {
  const { email } = useSelector((state) => state.profileVisited);
  const dispatch = useDispatch();

  useEffect(() => {
    const refPostsUser = collection(db, "posts");
    const q = query(
      refPostsUser,
      where("email", "==", email),
      orderBy("fechaCreacion", "desc")
    );

    const unsubscribe = onSnapshot(q, (qs) => {
      const posts = mapeoDocsPostsAObjetos(qs.docs);
      dispatch(getPostsUserProfile(posts));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch, email]);

  return (
    <main className="main-profile box">
      <SectionInforProfile />
      <SectionFriends />
      <SectionPostsProfile />
      <ModalCreatePost />
    </main>
  );
};

export default MainProfile;
