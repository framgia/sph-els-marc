import { useState } from "react";
import React from "react";

import { Routes, Route, Navigate, useParams, Outlet } from "react-router-dom";

import LandingPage from "./pages/landing/LandingPage";
import HttpCodePage from "./pages/http-code/HttpCodePage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LoginFormik from "./pages/login/LoginPage";

function App() {
  /** Organize Protected Routes for the mean time */
  //eslint-disable-next-line
  const [user, setUser] = useState(null);

  /** TODO: To be removed later once the needed pages are implemented. */
  function Child() {
    let { id } = useParams();
    return (
      <div>
        <h3>ID: {id}</h3>
      </div>
    );
  }

  function ChildTwo() {
    let { id, word_id } = useParams();
    return (
      <div>
        <h3>ID: {id}</h3>
        <h3>Word ID: {word_id}</h3>
      </div>
    );
  }

  const ProtectedRoute = ({ user, redirectPath = "/" }) => {
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login/" element={<LoginFormik />} />
      <Route path="/register/" element={<> Register </>} />
      <Route path="/dashboard/" element={<DashboardPage />} />
      <Route element={<ProtectedRoute user={user} />}>
        <Route path="/profile/:id" element={<Child />} />
        <Route path="/category/:id" element={<Child />} />
        <Route path="/category/:id/word/:word_id" element={<ChildTwo />} />
      </Route>
      <Route path="*" element={<HttpCodePage />} />
    </Routes>
  );
}

export default App;
