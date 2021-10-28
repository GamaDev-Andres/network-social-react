import React from "react";
import Header from "../layout/Header";
import Posts from "./posts/Posts";
const defaultPosts = [
  {
    id: "32132322222321",
    user: {
      name: "andres",
      url: "edededededd",
    },
    likes: {
      cantidad: "1",
      users: {
        uid: 1232312,
        name: "juanito",
      },
    },
    coments: {
      cantidad: "1",
      users: {
        uid: 1321321,
        name: "pedrito",
      },
      text: "!323213232132321",
    },
  },
  {
    id: "3213232321",
    user: {
      name: "andres",
      url: "edededededd",
    },
    likes: {
      cantidad: "1",
      users: {
        uid: 1232312,
        name: "juanito",
      },
    },
    coments: {
      cantidad: "1",
      users: {
        uid: 1321321,
        name: "pedrito",
      },
      text: "!323213232132321",
    },
  },
];
const Home = () => {
  return (
    <div id="container-home">
      <Header />
      <main>
        <div className="container-all-posts">
          {defaultPosts.map((post) => (
            <Posts id={post.id} key={post.id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
