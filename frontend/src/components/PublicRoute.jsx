import { useContext } from "react";
import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function PublicRoute() {
  const { user, token, authLoading } =
    useContext(AuthContext);

  if (authLoading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div
          className="spinner-border text-primary"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (user && token) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return <Outlet />;
}

export default PublicRoute;