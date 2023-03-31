import React from "react";
import { useQuery } from "react-query";

import Post from "./Post";

import api from "../config/api";
import PostDetails from "./PostDetails";

const PostList = ({ userId }) => {
  const { data, error, isError, isLoading, refetch: refetchPosts } = useQuery(`${userId}-posts`, getUserPosts);

  async function getUserPosts() {
    const { data } = await api.get(`/users/${userId}/posts`);
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
      <h3>Posts</h3>
      <Post userId={userId} refetchPosts={refetchPosts} />
      {data.map((post) => {
        return <PostDetails key={post.id} postId={post.id} />;
      })}
    </div>
  );
};

export default PostList;
