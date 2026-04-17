import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ textAlign: "center", padding: "100px 20px" }}>
      <div style={{ fontSize: "120px", marginBottom: "20px" }}>🚧</div>
      <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "48px", color: "var(--text)", marginBottom: "16px" }}>
        Page Not Found
      </h1>
      <p style={{ color: "var(--text-muted)", fontSize: "18px", marginBottom: "40px" }}>
        We couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <button 
        className="btn btn-primary" 
        onClick={() => navigate("/")}
        style={{ padding: "14px 32px", fontSize: "18px", borderRadius: "30px" }}
      >
        Return Home
      </button>
    </div>
  );
}
