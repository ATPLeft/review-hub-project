import React, { useEffect, useState } from "react";

export default function Manager() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then(res => res.json())
      .then(setProducts);

    fetch("http://localhost:8080/api/reviews")
      .then(res => res.json())
      .then(setReviews);
  }, []);

  // ✅ Total Products
  const totalProducts = products.length;

  // ✅ Only APPROVED reviews
  const approvedReviews = reviews.filter(r => r.status === "APPROVED");

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

  // ⭐ Rating Distribution
  const ratingCounts = [1, 2, 3, 4, 5].map((star) =>
    approvedReviews.filter((r) => r.rating === star).length
  );

  return (
    <div className="container">
      <h2>Manager Dashboard</h2>

      {/* 🔥 STATS */}
      <div className="grid">
        <div className="card stat">
          <span className="label">Total Products</span>
          <span className="value">{totalProducts}</span>
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

      {/* 📊 REAL CHART */}
      <h3 style={{ marginTop: "30px" }}>Rating Overview</h3>

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
    </div>
  );
}