import React, { useEffect } from "react";
import { useQuery } from "react-query";

import Comment from "./Comment";

import api from "../config/api";

async function getComments() {
  const { data } = await api.get("/comments");
  return data;
}

const CommentList = () => {
  const { data, error, isError, isLoading } = useQuery("comments", getComments);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className="container">
      <h1>Comments</h1>
      <Comment />
      {data.map((comment) => {
        return (
          <li key={comment.id}>
            {comment.name} | {comment.post_id} | {comment.email} | {comment.body}
          </li>
        );
      })}
    </div>
  );
};

export default CommentList;
