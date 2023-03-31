import React, { useEffect } from "react";
import { useQuery } from "react-query";

import Comment from "./Comment";

import api from "../config/api";

const CommentList = ({ postId }) => {
  const { data, error, isError, isLoading, refetch: refetchComments } = useQuery(`${postId}-comments`, getComments);

  async function getComments() {
    const { data } = await api.get(`/posts/${postId}/comments`);
    return data;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className="container">
      <h3>Comments</h3>
      <Comment postId={postId} refetchComments={refetchComments} />
      {data.map((comment) => {
        return (
          <li key={comment.id}>
            {comment.id} | {comment.name} | {comment.email} | {comment.body}
          </li>
        );
      })}
    </div>
  );
};

export default CommentList;
