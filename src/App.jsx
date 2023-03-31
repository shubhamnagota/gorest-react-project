import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import PostDetails from "./components/PostDetails";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate replace to="/users" />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </div>
  );
}

export default App;
