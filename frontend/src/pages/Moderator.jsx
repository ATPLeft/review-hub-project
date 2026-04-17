import React, { useEffect, useState } from "react";

function Moderator() {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("ALL");

  const fetchReviews = () => {
    fetch("http://localhost:8080/api/reviews")
      .then(res => res.json())
      .then(setReviews);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const updateStatus = (id, status) => {
    fetch(`http://localhost:8080/api/reviews/${id}?status=${status}`, {
      method: "PUT"
    }).then(() => fetchReviews());
  };

  // 🔥 DELETE FUNCTION
  const deleteReview = (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    fetch(`http://localhost:8080/api/reviews/${id}`, {
      method: "DELETE"
    }).then(() => {
      alert("Review deleted!");
      fetchReviews();
    });
  };

  // 🔥 FILTER LOGIC
  const filteredReviews = reviews.filter(r => {
    if (filter === "ALL") return true;
    return r.status === filter;
  });

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      {/* 🔥 FILTER DROPDOWN */}
      <div className="filter-container" style={{ padding: "0 0 20px 0" }}>
        <label style={{ fontWeight: "600" }}>Filter: </label>
        <select className="select" style={{ width: "auto" }} onChange={(e) => setFilter(e.target.value)}>
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {filteredReviews.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)", fontSize: "16px" }}>
          No reviews found in this category.
        </div>
      )}

      {filteredReviews.length > 0 && (
        <div style={{ overflowX: "auto", background: "var(--card-bg)", borderRadius: "var(--radius-lg)", border: "1px solid var(--glass-border)", padding: "10px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontFamily: "'Inter', sans-serif" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--glass-border)", color: "var(--text-muted)" }}>
                <th style={{ padding: "16px" }}>Prod_ID</th>
                <th style={{ padding: "16px" }}>User</th>
                <th style={{ padding: "16px" }}>Rating & Comment</th>
                <th style={{ padding: "16px" }}>Status</th>
                <th style={{ padding: "16px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map((r) => (
                <tr key={r.id} style={{ borderBottom: "1px solid var(--glass-border)", transition: "background 0.2s" }} onMouseOver={e => e.currentTarget.style.background="rgba(16, 185, 129, 0.05)"} onMouseOut={e => e.currentTarget.style.background="transparent"}>
                  <td style={{ padding: "16px", fontWeight: "600", color: "var(--primary)" }}>#{r.productId}</td>
                  <td style={{ padding: "16px" }}>{r.user || "Guest"}</td>
                  <td style={{ padding: "16px", maxWidth: "300px" }}>
                    <span style={{ color: "#f59e0b", letterSpacing: "2px" }}>{"★".repeat(r.rating)}</span><br/>
                    <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>{r.comment}</span>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <span style={{
                      padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold",
                      background: r.status === "APPROVED" ? "rgba(16, 185, 129, 0.2)" : r.status === "REJECTED" ? "rgba(239, 68, 68, 0.2)" : "rgba(245, 158, 11, 0.2)",
                      color: r.status === "APPROVED" ? "#059669" : r.status === "REJECTED" ? "#b91c1c" : "#b45309"
                    }}>
                      {r.status}
                    </span>
                  </td>
                  <td style={{ padding: "16px", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      {r.status !== "APPROVED" && (
                        <button className="btn btn-outline" style={{ padding: "6px 12px", fontSize: "12px" }} onClick={() => updateStatus(r.id, "APPROVED")}>Approve</button>
                      )}
                      {r.status !== "REJECTED" && (
                        <button className="btn btn-outline" style={{ padding: "6px 12px", fontSize: "12px" }} onClick={() => updateStatus(r.id, "REJECTED")}>Reject</button>
                      )}
                      <button className="btn btn-primary" style={{ padding: "6px 12px", fontSize: "12px", background: "#ef4444", boxShadow: "none" }} onClick={() => deleteReview(r.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Moderator;