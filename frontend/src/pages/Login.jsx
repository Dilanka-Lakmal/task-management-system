import { useContext, useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

import "./Login.css";


function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] =
    useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      const { user, token } = response.data;

      login(user, token);

      toast.success("Login successful");

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        "Login failed. Please check your details.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100 py-4">
          <div className="col-12 col-md-10 col-lg-9 col-xl-8">
            <div className="login-card">
              <div className="row g-0">
                <div className="col-lg-6 d-none d-lg-flex">
                  <section className="login-brand-section">
                    <div>
                      <div className="brand-icon">
                        ✓
                      </div>

                      <h1 className="mt-4">
                        TaskFlow
                      </h1>

                      <p className="login-brand-text">
                        Organize your tasks, monitor
                        progress and complete your
                        work efficiently.
                      </p>
                    </div>

                    <div className="login-feature-list">
                      <div className="login-feature">
                        <span>✓</span>
                        Manage daily tasks
                      </div>

                      <div className="login-feature">
                        <span>✓</span>
                        Track task progress
                      </div>

                      <div className="login-feature">
                        <span>✓</span>
                        Monitor dashboard statistics
                      </div>
                    </div>
                  </section>
                </div>

                <div className="col-12 col-lg-6">
                  <section className="login-form-section">
                    <div className="d-lg-none text-center mb-4">
                      <div className="brand-icon mx-auto">
                        ✓
                      </div>

                      <h2 className="mt-3 mb-0">
                        TaskFlow
                      </h2>
                    </div>

                    <div className="mb-4">
                      <p className="login-label mb-2">
                        WELCOME BACK
                      </p>

                      <h2 className="fw-bold mb-2">
                        Sign in to your account
                      </h2>

                      <p className="text-muted mb-0">
                        Enter your account details to
                        access the task dashboard.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label
                          htmlFor="email"
                          className="form-label fw-semibold"
                        >
                          Email address
                        </label>

                        <input
                          id="email"
                          type="email"
                          name="email"
                          className={`form-control login-input ${
                            errors.email
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="admin@test.com"
                          value={formData.email}
                          onChange={handleChange}
                          autoComplete="email"
                          autoFocus
                        />

                        {errors.email && (
                          <div className="invalid-feedback">
                            {errors.email}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="password"
                          className="form-label fw-semibold"
                        >
                          Password
                        </label>

                        <div className="input-group">
                          <input
                            id="password"
                            type={
                              showPassword
                                ? "text"
                                : "password"
                            }
                            name="password"
                            className={`form-control login-input ${
                              errors.password
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                          />

                          <button
                            type="button"
                            className="btn btn-outline-secondary password-button"
                            onClick={() =>
                              setShowPassword(
                                (previousValue) =>
                                  !previousValue
                              )
                            }
                            aria-label={
                              showPassword
                                ? "Hide password"
                                : "Show password"
                            }
                          >
                            {showPassword
                              ? "Hide"
                              : "Show"}
                          </button>

                          {errors.password && (
                            <div className="invalid-feedback d-block">
                              {errors.password}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="form-check">
                          <input
                            id="remember"
                            className="form-check-input"
                            type="checkbox"
                          />

                          <label
                            className="form-check-label text-muted"
                            htmlFor="remember"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary login-button w-100"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              aria-hidden="true"
                            />

                            Signing in...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </button>

                    </form>

                    <div className="demo-account mt-4">
                      <p className="fw-semibold mb-2">
                        Demo account
                      </p>

                      <p className="mb-1">
                        Email:{" "}
                        <strong>
                          admin@test.com
                        </strong>
                      </p>

                      <p className="mb-0">
                        Password:{" "}
                        <strong>123456</strong>
                      </p>
                    </div>
                    <p className="text-center text-muted mt-4 mb-0">
  Don&apos;t have an account?{" "}
  <Link
    to="/register"
    className="fw-semibold text-decoration-none"
  >
    Create account
  </Link>
</p>
                  </section>
                </div>
              </div>
            </div>

            <p className="text-center login-footer mt-4 mb-0">
              Task Management System
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;