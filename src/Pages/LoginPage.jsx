// src/Pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPageStyle.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await fetch("/user.json");
      const users = await response.json();

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        // Create encrypted session (Base64)
        const sessionData = {
          email: user.email,
          time: Date.now(),
        };
        const encrypted = btoa(JSON.stringify(sessionData));
        localStorage.setItem("session", encrypted);

        // Navigate to movies
        navigate("/movies");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Login failed (could not read users)");
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <h1 className="main-title">
            🎬 <span className="login-title">Movie Explorer</span> 📽️
          </h1>
          <br></br>
          <h2 className="login-subtitle">Login</h2>

          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button onClick={login}>Login</button>
          {error && <p className="error-text">{error}</p>}
        </div>
      </div>
      {/* FOOTER FIXED AT BOTTOM */}
      <p className="footer-note">
        © 2025 Movie Explorer — Personal Project.
        <br />
        Not Affiliated with any Streaming Service.
      </p>
    </div>
  );
}

export default LoginPage;
