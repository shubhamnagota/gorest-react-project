import React, { useState } from "react";
import { useMutation } from "react-query";

import api from "../config/api";
import { getErrorMessage } from "../utils";

const Post = ({ userId, refetchPosts }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { isLoading, isError, error, mutate, data } = useMutation(createPost, { retry: 1 });

  async function createPost() {
    const { data } = await api.post(`/users/${userId}/posts`, { user_id: userId, title, body });
    await refetchPosts();
    return data;
  }

  return (
    <>
      <div className="post">
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Body:</label>
        <input type="text" value={body} onChange={(e) => setBody(e.target.value)} />

        <button onClick={mutate}>Create</button>

        <p> Created a new Post ID: {data && data.id}</p>

        <div style={{ color: "gray", background: "#234" }}>
          {isLoading ? "Saving..." : ""}
          {isError ? getErrorMessage(error) : ""}
        </div>
      </div>
    </>
  );
};

export default Post;
