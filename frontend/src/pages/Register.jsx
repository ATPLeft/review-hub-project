import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../ToastContext";

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const nav = useNavigate();
  const showToast = useToast();

  const submit = async () => {
    // ✅ validation
    if (!data.email || !data.password) {
      showToast("Please fill all fields", "error");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      });

      if (!res.ok) {
        throw new Error("Registration failed");
      }

      const msg = await res.text();

      showToast("User registered successfully!", "success");

      nav("/login");
    } catch (e) {
      showToast("Backend not connected or error!", "error");
    }
  };

  return (
    <div className="center">
      <div className="auth-card">
        <div className="h1">Create Account</div>
        <div className="muted">Join Review-Hub in seconds</div>

        <label>Name</label>
        <input
          className="input"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <label>Email</label>
        <input
          className="input"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <label>Password</label>
        <input
          type="password"
          className="input"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button
          className="btn btn-primary"
          style={{ width: "100%" }}
          onClick={submit}
        >
          Register
        </button>
      </div>
    </div>
  );
}