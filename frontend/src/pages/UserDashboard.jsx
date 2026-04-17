import React, { useEffect, useState } from "react";

export default function UserDashboard() {
  const [reviews, setReviews] = useState([]);

  const user = localStorage.getItem("user");

  useEffect(() => {
    fetch("http://localhost:8080/api/reviews")
      .then(res => res.json())
      .then(data => setReviews(data));
  }, []);

  // ✅ Only APPROVED reviews (recommended)
  const approvedReviews = reviews.filter(r => r.status === "APPROVED");

  // ✅ My Reviews
  const myReviews = approvedReviews.filter(r => r.user === user);

  // ✅ Total Reviews
  const totalReviews = approvedReviews.length;

  // ✅ Average Rating
  const avg =
    approvedReviews.length > 0
      ? (
          approvedReviews.reduce((sum, r) => sum + r.rating, 0) /
          approvedReviews.length
        ).toFixed(1)
      : 0;

  // ⭐ Rating Distribution (REAL DATA)
  const ratingCounts = [1, 2, 3, 4, 5].map((star) =>
    approvedReviews.filter((r) => r.rating === star).length
  );

  return (
    <div className="container">
      <h2>User Dashboard</h2>

      {/* 🔥 STATS */}
      <div className="grid">
        <div className="card stat">
          <span className="label">My Reviews</span>
          <span className="value">{myReviews.length}</span>
        </div>

        <div className="card stat">
          <span className="label">Total Reviews</span>
          <span className="value">{totalReviews}</span>
        </div>

        <div className="card stat">
          <span className="label">Average Rating</span>
          <span className="value">{avg}</span>
        </div>
      </div>

      {/* ⭐ REAL CHART */}
      <h3 style={{ marginTop: "30px" }}>Rating Distribution</h3>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        {ratingCounts.map((count, index) => (
          <div key={index} style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                width: "40px",
                height: `${count === 0 ? 5 : count * 30}px`,
                background: "var(--primary)",
                borderRadius: "6px",
                margin: "0 auto",
                boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)"
              }}
            ></div>

            <p style={{ margin: 0, fontWeight: "600", color: "var(--text-muted)", fontSize: "14px" }}>{index + 1} ⭐</p>
            <small style={{ fontWeight: "700" }}>{count}</small>
          </div>
        ))}
      </div>

      {/* 📝 MY REVIEWS */}
      <h3 style={{ marginTop: "30px" }}>My Reviews</h3>

      {myReviews.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)", background: "var(--card-bg)", borderRadius: "var(--radius-lg)" }}>
          You haven't written any reviews yet.
        </div>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {myReviews.map((r, i) => (
            <div key={i} className="card" style={{ display: "flex", gap: "20px", alignItems: "flex-start", padding: "24px" }}>
              
              <div style={{
                width: "48px", height: "48px", borderRadius: "50%",
                background: "linear-gradient(135deg, var(--primary), #3b82f6)",
                color: "white", display: "flex", justifyContent: "center", alignItems: "center",
                fontSize: "20px", fontWeight: "bold", flexShrink: 0
              }}>
                {(user || "U")[0].toUpperCase()}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div>
                    <h4 style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: "16px" }}>Product #{r.productId}</h4>
                    <div style={{ color: "#f59e0b", letterSpacing: "2px", fontSize: "14px", marginTop: "4px" }}>
                      {"★".repeat(r.rating)}
                    </div>
                  </div>
                  
                  <span style={{
                    padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold",
                    background: r.status === "APPROVED" ? "rgba(16, 185, 129, 0.2)" : r.status === "REJECTED" ? "rgba(239, 68, 68, 0.2)" : "rgba(245, 158, 11, 0.2)",
                    color: r.status === "APPROVED" ? "#059669" : r.status === "REJECTED" ? "#b91c1c" : "#b45309"
                  }}>
                    {r.status || "PENDING"}
                  </span>
                </div>

                <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: "1.6", margin: 0 }}>
                  "{r.comment}"
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}