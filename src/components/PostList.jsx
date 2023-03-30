import React from "react";
import { useQuery } from "react-query";

import Post from "./Post";

import api from "../config/api";

async function getPosts() {
  const { data } = await api.get("/posts");
  return data;
}

const PostList = () => {
  const { data, error, isError, isLoading } = useQuery("posts", getPosts);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className="container">
      <h1>Posts</h1>
      <Post />
      {data.map((post) => {
        return (
          <li key={post.id}>
            {post.user_id} | {post.title} | {post.body}
          </li>
        );
      })}
    </div>
  );
};

export default PostList;
