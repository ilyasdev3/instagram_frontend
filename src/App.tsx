import React from "react";
import { Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewPost from "./pages/NewPost";
import Register from "./pages/Register";
import AuthGuard from "./components/AuthGuard";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <AuthGuard>
              <Home />
            </AuthGuard>
          }
        />
        <Route
          path="/explore"
          element={
            <AuthGuard>
              <Explore />
            </AuthGuard>
          }
        />
        <Route
          path="/new-post"
          element={
            <AuthGuard>
              <NewPost />
            </AuthGuard>
          }
        />
      </Routes>
    </>
  );
};

export default App;
