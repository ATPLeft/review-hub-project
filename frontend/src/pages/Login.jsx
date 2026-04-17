import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../ToastContext";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const nav = useNavigate();
  const showToast = useToast();

  const submit = async () => {
    // ✅ validation
    if (!data.email || !data.password) {
      showToast("Please fill all fields", "error");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const user = await res.json();

      // ✅ Store REAL data
      localStorage.setItem("user", user.email);
      localStorage.setItem("role", user.role);

      showToast("Login successful!", "success");

      nav("/");
    } catch (e) {
      showToast("Invalid email or password", "error");
    }
  };

  return (
    <div className="center">
      <div className="auth-card">
        <div className="h1">Welcome Back</div>
        <div className="muted">Sign in to your Review-Hub account</div>

        <label>Email Address</label>
        <input
          className="input"
          placeholder="you@example.com"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <label>Password</label>
        <input
          type="password"
          className="input"
          placeholder="••••••••"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button
          className="btn btn-primary"
          style={{ width: "100%" }}
          onClick={submit}
        >
          Sign In
        </button>

        <div className="space"></div>
        <div className="muted">
          Don't have an account? <a href="/register">Register here</a>
        </div>
      </div>
    </div>
  );
}