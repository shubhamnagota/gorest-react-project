import React, { useState } from "react";
import { useMutation } from "react-query";

import api from "../config/api";

const User = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [status, setStatus] = useState("active");

  const { isLoading, isError, error, mutate, data } = useMutation(createUser, { retry: 3 });

  async function createUser() {
    const { data } = await api.post("/users", { name, email, gender, status });
    return data;
  }

  return (
    <>
      <div className="post">
        <h1>Create a User</h1>

        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

        <button onClick={mutate}>Create</button>

        <p> Created a new User ID: {data && data.id}</p>
        <div style={{ color: "gray", background: "#234" }}>
          {isLoading ? "Saving..." : ""}
          {isError ? error.message : ""}
        </div>
      </div>
    </>
  );
};

export default User;
