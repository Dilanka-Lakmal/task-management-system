import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";

import "./Login.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const [errors, setErrors] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const handleChange = (event) => {
    const { name, value } =
      event.target;

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

    if (!formData.name.trim()) {
      newErrors.name =
        "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password =
        "Password is required";
    } else if (
      formData.password.length < 6
    ) {
      newErrors.password =
        "Password must contain at least 6 characters";
    }

    if (
      formData.confirmPassword !==
      formData.password
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      toast.success(
        "Account created successfully"
      );

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Could not create the account"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100 py-4">
          <div className="col-12 col-md-9 col-lg-6 col-xl-5">
            <div className="login-card">
              <section className="login-form-section">
                <div className="text-center mb-4">
                  <div className="brand-icon mx-auto">
                    ✓
                  </div>

                  <h2 className="fw-bold mt-3">
                    Create your account
                  </h2>

                  <p className="text-muted">
                    Start organizing and tracking
                    your tasks.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                >
                  <div className="mb-3">
                    <label
                      htmlFor="name"
                      className="form-label fw-semibold"
                    >
                      Full name
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      className={`form-control login-input ${
                        errors.name
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />

                    {errors.name && (
                      <div className="invalid-feedback">
                        {errors.name}
                      </div>
                    )}
                  </div>

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
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
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
                        value={
                          formData.password
                        }
                        onChange={handleChange}
                        placeholder="Minimum 6 characters"
                      />

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setShowPassword(
                            (currentValue) =>
                              !currentValue
                          )
                        }
                      >
                        {showPassword
                          ? "Hide"
                          : "Show"}
                      </button>
                    </div>

                    {errors.password && (
                      <div className="text-danger small mt-1">
                        {errors.password}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="form-label fw-semibold"
                    >
                      Confirm password
                    </label>

                    <input
                      id="confirmPassword"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      className={`form-control login-input ${
                        errors.confirmPassword
                          ? "is-invalid"
                          : ""
                      }`}
                      value={
                        formData.confirmPassword
                      }
                      onChange={handleChange}
                      placeholder="Enter password again"
                    />

                    {errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {
                          errors.confirmPassword
                        }
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary login-button w-100"
                    disabled={loading}
                  >
                    {loading
                      ? "Creating account..."
                      : "Create Account"}
                  </button>
                </form>

                <p className="text-center text-muted mt-4 mb-0">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    className="fw-semibold text-decoration-none"
                  >
                    Sign in
                  </Link>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;