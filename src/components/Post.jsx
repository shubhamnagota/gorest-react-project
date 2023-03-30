import React, { useState } from "react";
import { useMutation } from "react-query";

import api from "../config/api";

const Post = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { isLoading, isError, error, mutate, data } = useMutation(createPost, { retry: 3 });

  async function createPost() {
    const { data } = await api.post("/posts", { user_id: 600655, title, body });
    return data;
  }

  return (
    <>
      <div className="post">
        <h1>Create a Post</h1>

        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Body:</label>
        <input type="text" value={body} onChange={(e) => setBody(e.target.value)} />

        <button onClick={mutate}>Create</button>

        <p> Created a new Post ID: {data && data.id}</p>
        <div style={{ color: "gray", background: "#234" }}>
          {isLoading ? "Saving..." : ""}
          {isError ? error.message : ""}
        </div>
      </div>
    </>
  );
};

export default Post;
