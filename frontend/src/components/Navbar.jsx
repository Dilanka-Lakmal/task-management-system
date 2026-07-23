import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="app-navbar">

      <div className="container">

        <div className="navbar-content">

          <div className="navbar-logo">

            <div className="logo-icon">
              ✓
            </div>

            <div>

              <h4 className="logo-title">
                TaskFlow
              </h4>

              <span className="logo-subtitle">
                Task Management System
              </span>

            </div>

          </div>

          <div className="navbar-right">

            <div className="user-info">

              <div className="user-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <div>

                <div className="welcome-text">
                  Welcome Back
                </div>

                <div className="user-name">
                  {user?.name}
                </div>

              </div>

            </div>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;