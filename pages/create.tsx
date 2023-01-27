import React, { useState } from "react";
import Router from "next/router";

const Draft: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={submitData}>
        <h1>New Draft</h1>
        <input
          type="text"
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          value={title}
        />
        <textarea
          cols={50}
          rows={8}
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input disabled={!content || !title} type="submit" value="Create" />
        <a href="#" className="back" onClick={() => Router.push("/")}>
          Cancel
        </a>
      </form>
    </div>
  );
};

export default Draft;
