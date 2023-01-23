import styles from "../styles/Home.module.css";
import React from "react";
import { GetStaticProps } from "next";
import Post, { PostProps } from "../components/Post";
import Header from "../components/Header";

export const getStaticProps: GetStaticProps = async () => {
  const feed = [
    {
      id: "1",
      title: "Lorem",
      content: "wfjwfwefkwfnwefjkwenfjkwenfjwekfnjwef",
      published: false,
      author: {
        name: "Bob",
        email: "bob@bob.bob",
      },
    },
  ];
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[];
};

const Home: React.FC<Props> = (props) => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1>Public Feed</h1>
        {props.feed.map((post) => (
          <div key={post.id} className={styles.post}>
            <Post post={post} />
          </div>
        ))}
      </main>
    </>
  );
};

export default Home;
