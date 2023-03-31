import React, { useState } from "react";
import { useMutation } from "react-query";

import api from "../config/api";
import { getErrorMessage } from "../utils";

const Comment = ({ postId, refetchComments }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  const { isLoading, isError, error, mutate, data } = useMutation(createComment, { retry: 1 });

  async function createComment() {
    const { data } = await api.post(`/posts/${postId}/comments`, { post_id: postId, name, email, body });
    await refetchComments();
    return data;
  }

  return (
    <>
      <div className="post">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Body:</label>
        <input type="text" value={body} onChange={(e) => setBody(e.target.value)} />

        <button onClick={mutate}>Create</button>

        <p> Created a new Comment ID: {data && data.id}</p>
        <div style={{ color: "gray", background: "#234" }}>
          {isLoading ? "Saving..." : ""}
          {isError ? getErrorMessage(error) : ""}
        </div>
      </div>
    </>
  );
};

export default Comment;
