// src/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute:
 * - Expects session stored in localStorage as base64-encoded JSON under "session"
 * - Decrypts (atob), parses JSON and checks basic fields and expiry (24h)
 * - If valid returns children, otherwise clears session and redirects to login
 */
function ProtectedRoute({ children }) {
  const encrypted = localStorage.getItem("session");

  if (!encrypted) {
    return <Navigate to="/" replace />;
  }

  try {
    // Decrypt and parse
    const decoded = JSON.parse(atob(encrypted));

    // Basic validation
    if (!decoded.email || !decoded.time) throw new Error("Invalid session");

    // Expiration check — 24 hours (customize if you want other TTL)
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    if (now - decoded.time > oneDay) {
      localStorage.removeItem("session");
      return <Navigate to="/" replace />;
    }

    // Session valid
    return children;
  } catch (err) {
    // Corrupted/tampered session
    localStorage.removeItem("session");
    return <Navigate to="/" replace />;
  }
}

export default ProtectedRoute;
