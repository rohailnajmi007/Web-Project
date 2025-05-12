import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Login.css";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setToken, token, backendUrl } = useContext(ShopContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(backendUrl + "/api/user/login", {
        email,
        password,
      });
      console.log(response.data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/"); // Redirect to home page
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, [token, setToken]);
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">
          Login <span>—</span>
        </h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <div className="auth-footer">
          <span>Don't have an account?</span>
          <Link to="/signup" className="auth-link">
            Sign Up Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
