import React from "react";

import UserList from "./components/UserList";
import PostList from "./components/PostList";
import CommentList from "./components/CommentList";

import "./App.css";

function App() {
  return (
    <div className="App">
      <UserList />
      <PostList />
      <CommentList />
    </div>
  );
}

export default App;
