import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import User from "./User";
import Loading from "./Loading";

import api from "../config/api";

async function getUsers() {
  const { data } = await api.get("/users");
  return data;
}

const UserList = () => {
  const { data, error, isError, isLoading, refetch: refetchUsers } = useQuery("users", getUsers);
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className="container">
      <h1>Users</h1>
      <User refetchUsers={refetchUsers} />
      <table class="table table-striped table-hover">
        <thead className="table-success">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => {
            return (
              <tr key={user.id} onClick={() => navigate(`/users/${user.id}`)}>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
