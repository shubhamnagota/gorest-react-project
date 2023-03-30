import React, { useEffect } from "react";
import { useQuery } from "react-query";

import User from "./User";

import api from "../config/api";

async function getUsers() {
  const { data } = await api.get("/users");
  return data;
}

const UserList = () => {
  const { data, error, isError, isLoading } = useQuery("users", getUsers);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className="container">
      <h1>Users</h1>
      <User />
      {data.map((user) => {
        return (
          <li key={user.id}>
            {user.name} | {user.email} | {user.gender} | {user.status}
          </li>
        );
      })}
    </div>
  );
};

export default UserList;
