import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../firebase/credentials";

export const mapeoDocsPostsAObjetos = (arrDocs) => {
  return arrDocs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
export const verificandoExistenciaUid = (uid) => {};
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

// export const escucharUltimosPosts=()=>{
//   const refCollection = collection(db, `usuarios`);
//   const unsubscribe = onSnapshot(
//     refCollection,
//     (querySnapshot) => {
//       querySnapshot.forEach(async (doc) => {
//         const ref = collection(db, `${doc.ref.path}/posts`);
//         const docs = await getDocs(ref);
//         docs.forEach((doc) => {
//           const post = doc.data();
//           dispatch(createPost({ ...post, id: doc.id }));
//         });
//       });
//     },
//     (error) => {
//       console.log("ERROR AL ESCUCHAR");
//       console.log(error);
//     }
//   );
// }
