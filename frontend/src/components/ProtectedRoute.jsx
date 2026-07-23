import { useContext } from "react";
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function ProtectedRoute() {
  const { user, token, authLoading } =
    useContext(AuthContext);

  const location = useLocation();

  if (authLoading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <p className="text-muted mt-3">
            Checking your account...
          </p>
        </div>
      </div>
    );
  }

  if (!user || !token) {
    return (
      <Navigate
        to="/"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;