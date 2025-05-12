import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Login.css";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentState, setCurrentState] = useState("Login");
  const navigate = useNavigate();
  const { setToken, token, backendUrl } = useContext(ShopContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Registration successful");
        } else {
          toast.error(response.data.message);
        }
      } else {
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
    <div className="login-bg">
      <div className="login-card">
        <h2>
          {currentState} <span>—</span>
        </h2>
        <form className="login-form" onSubmit={onSubmitHandler}>
          {currentState === "Sign Up" && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={currentState === "Sign Up"}
              className="login-input"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">
            {currentState}
          </button>
        </form>
        <div className="login-footer">
          {currentState === "Login" ? (
            <>
              <span>Don't have an account?</span>
              <button
                className="login-link"
                onClick={() => setCurrentState("Sign Up")}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              <span>Already have an account?</span>
              <button
                className="login-link"
                onClick={() => setCurrentState("Login")}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
