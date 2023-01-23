import React from "react";
import Router from "next/router";
import styles from "../styles/Post.module.css";
import ReactMarkdown from "react-markdown"; //alternative to dangerouslySetInnerHTML

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Anon";
  return (
    <div
      className={styles.card}
      onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
    >
      <h2>{post.title}</h2>
      <p>By {authorName}</p>
      <ReactMarkdown children={post.content} />
    </div>
  );
};

export default Post;
