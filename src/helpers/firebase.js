import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../firebase/credentials";

export const mapeoDocsPostsAObjetos = (arrDocs) => {
  return arrDocs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const filtrarPerfil = async (uid) => {
  try {
    const refUsuarios = collection(db, "usuarios");
    const q = query(refUsuarios, where("uid", "==", uid));
    const users = await getDocs(q);
    return users.docs[0];
  } catch (error) {
    console.log("user no existe con ese uid");
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    const refUsuarios = collection(db, "usuarios");
    const users = await getDocs(refUsuarios);
    return users.docs;
  } catch (error) {
    console.log(error);
  }
};
// export const filtrarPostsPorPerfil = async (email) => {
//   try {
//     //   const refPosts = collection(db, "posts");
//     //   const q = query(refPosts, where("email", "==", email));
//     //   const posts = await getDocs(q);
//     // const unsubscribe = onSnapshot(
//     //   q,
//     //   (querySnapshot) => {
//     //     const posts = mapeoDocsPostsAObjetos(querySnapshot.docs);
//     //     dispatc(getAllPosts(posts));
//     //   },
//     //   (error) => {
//     //     console.log("ERROR AL ESCUCHAR");
//     //     console.log(error);
//     //   }
//     // );
//     // console.log(posts);
//   } catch (error) {
//     console.log("error filtrarPostsPorPerfil");
//     console.log(error);
//   }
// };
