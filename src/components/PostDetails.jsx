import React from "react";
import { useQuery } from "react-query";

import CommentList from "./CommentList";
import Loading from "./Loading";

import api from "../config/api";

const PostDetails = ({ postId }) => {
  async function getPostDetails() {
    const { data } = await api.get(`/posts/${postId}`);
    return data;
  }

  const { data: post, error, isError, isLoading } = useQuery(`post-${postId}`, getPostDetails);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <li key={post.id}>
      {post.id} | {post.title} | {post.body}
      <CommentList postId={post.id} />
    </li>
  );
};

export default PostDetails;
