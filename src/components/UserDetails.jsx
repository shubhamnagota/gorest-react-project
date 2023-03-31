import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import Loading from "./Loading";

import api from "../config/api";
import PostList from "./PostList";

const UserDetails = () => {
  const { id: userId } = useParams();

  async function getUserDetails() {
    const { data } = await api.get(`/users/${userId}`);
    return data;
  }

  const { data: user, error, isError, isLoading } = useQuery(`user-${userId}`, getUserDetails);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className="container">
      <h3>User: {user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Gender: {user.gender}</p>
      <p>Status: {user.status}</p>

      <PostList userId={userId} />
    </div>
  );
};

export default UserDetails;
