import React, { useEffect, useState } from "react";

export default function Notifications() {
  const [data, setData] = useState([]);

  const user = localStorage.getItem("user");

  useEffect(() => {
    fetch(`http://localhost:8080/api/notifications/${user}`)
      .then(res => res.json())
      .then(setData);
  }, [user]);

  return (
    <div className="container">
      <h2>Notifications</h2>

      {data.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "var(--card-bg)", borderRadius: "var(--radius-lg)", border: "1px solid var(--glass-border)", marginTop: "20px" }}>
          <div style={{ fontSize: "60px", marginBottom: "16px", opacity: 0.5 }}>📭</div>
          <h3 style={{ color: "var(--text)", fontFamily: "'Outfit', sans-serif", fontSize: "20px", marginBottom: "8px" }}>All Caught Up!</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "15px", margin: 0 }}>You have no new notifications to review right now.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "20px" }}>
          {data.map((n, i) => (
            <div key={i} className="card" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--primary)", flexShrink: 0 }}></div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: "16px", color: "var(--text)", lineHeight: "1.5" }}>{n.message}</p>
                <small style={{ color: "var(--text-muted)", fontSize: "13px", marginTop: "4px", display: "block" }}>{new Date().toLocaleDateString()} - System Event</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}