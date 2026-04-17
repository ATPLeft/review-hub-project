import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "../ToastContext";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  
  // Review form state
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const showToast = useToast();

  const user = localStorage.getItem("user");

  useEffect(() => {
    // Fetch all products to find by ID since we don't know the exact single-fetch endpoint
    fetch("http://localhost:8080/api/products")
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.id.toString() === id);
        setProduct(found);
      });

    fetchReviews();
  }, [id]);

  const fetchReviews = () => {
    fetch("http://localhost:8080/api/reviews")
      .then(res => res.json())
      .then(data => {
        // Filter reviews for this product immediately
        const prodReviews = data.filter(r => r.productId.toString() === id && r.status === "APPROVED");
        setReviews(prodReviews);
      });
  };

  if (!product) {
    return (
      <div className="container pd-container">
        <button className="btn btn-outline back-btn" onClick={() => navigate(-1)}>
          ← Back to Shop
        </button>
        <div className="pd-layout">
          <div className="pd-product-section">
            <div className="skeleton skeleton-img pd-image-wrapper"></div>
            <div className="skeleton skeleton-text" style={{ height: "40px", marginBottom: "20px" }}></div>
            <div className="skeleton skeleton-text-short" style={{ height: "30px" }}></div>
          </div>
          <div className="pd-review-section">
            <div className="skeleton skeleton-text" style={{ height: "100px", marginBottom: "40px" }}></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    stars: star,
    count: reviews.filter(r => r.rating === star).length
  }));

  const submitReview = () => {
    if (!user) {
      showToast("Please login to write a review!", "error");
      navigate("/login");
      return;
    }
    if (!rating) {
      showToast("Please select a rating ⭐", "error");
      return;
    }

    setIsSubmitting(true);
    fetch("http://localhost:8080/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product.id,
        rating,
        comment,
        user: user || "Guest"
      })
    })
      .then(res => res.text())
      .then(() => {
        showToast("Review added and pending approval!", "success");
        fetchReviews(); // Re-fetch
        setRating(0);
        setComment("");
        setIsSubmitting(false);
      })
      .catch(err => {
        setIsSubmitting(false);
        showToast("Error adding review", "error");
      });
  };

  // Helper: map product name to a nice Unsplash image
  const getProductImage = (p) => {
    const name = p.name.toLowerCase();
    
    // Prioritize name matches over whatever image URL the DB has
    if (name.includes("headphone") || name.includes("ear") || name.includes("airpod") || name.includes("headset")) return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80";
    if (name.includes("laptop") || name.includes("mac") || name.includes("pc")) return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80";
    if (name.includes("mobile") || name.includes("phone") || name.includes("smartphone")) return "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80";
    if (name.includes("watch") || name.includes("smartwatch")) return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80";
    if (name.includes("camera") || name.includes("lens") || name.includes("dslr")) return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80";
    if (name.includes("bluetooth") || name.includes("speaker") || name.includes("sound")) return "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80";
    if (name.includes("chair") || name.includes("gaming") || name.includes("seat")) return "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&auto=format&fit=crop&q=80";
    if (name.includes("tv") || name.includes("television") || name.includes("monitor")) return "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80";
    if (name.includes("keyboard")) return "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80";
    if (name.includes("mouse")) return "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80";
    if (name.includes("tablet") || name.includes("ipad")) return "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80";
    
    // If the database has a specific image, and it didn't match the names above, use it.
    if (p.imageUrl && p.imageUrl.trim() !== "" && !p.imageUrl.includes("1611162617474")) {
      return p.imageUrl + "?w=600";
    }
    
    // Generic fallback tech product (a sleek white box / minimalist setup)
    return `https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=800&auto=format&fit=crop&q=80`;
  };

  return (
    <div className="container pd-container">
      
      <button className="btn btn-outline back-btn" onClick={() => navigate(-1)}>
        ← Back to Shop
      </button>

      <div className="pd-layout">
        
        {/* LEFT COLUMN: Product Info */}
        <div className="pd-product-section">
          <div className="pd-image-wrapper">
            <img 
              src={getProductImage(product)} 
              alt={product.name} 
              className="pd-main-img"
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=800&auto=format&fit=crop&q=80"; }}
            />
          </div>
          
          <div className="pd-info">
            <h1 className="pd-title">{product.name}</h1>
            <h2 className="pd-price">₹{product.price}</h2>
            
            <button className="btn btn-buy pd-buy-btn">Add to Cart</button>
            
            <div className="pd-description">
              <p>Experience the very best. This item is carefully crafted to bring you unparalleled performance and exquisite premium design.</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Reviews Section */}
        <div className="pd-review-section">
          
          <div className="pd-review-header">
            <div className="pd-overall-rating">
              <div className="pd-avg-number">{avgRating}</div>
              <div className="pd-stars">
                {"⭐".repeat(Math.round(avgRating))}
              </div>
              <div className="pd-responses">{totalReviews} responses</div>
            </div>

            <div className="pd-rating-bars">
              {ratingCounts.map(rc => (
                <div key={rc.stars} className="pd-bar-row">
                  <span className="pd-bar-label">{rc.stars} ★</span>
                  <div className="pd-bar-track">
                    <div 
                      className="pd-bar-fill" 
                      style={{ width: `${totalReviews > 0 ? (rc.count / totalReviews) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="pd-bar-count">{rc.count}</span>
                </div>
              ))}
            </div>
          </div>

          <hr className="pd-divider" />

          {/* WRITE REVIEW FORM */}
          <div className="pd-write-review">
            <h3>Write a Review</h3>
            <div className="pd-star-selector">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= rating ? "active" : ""}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            
            <textarea
              className="textarea pd-textarea"
              placeholder="What did you think about this product?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            
            <button 
              className="btn btn-primary" 
              onClick={submitReview}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>

          <hr className="pd-divider" />

          {/* REVIEW LIST */}
          <div className="pd-review-list">
            <h3>Recent Reviews</h3>
            {reviews.length === 0 ? (
              <p className="no-review">No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map((r, i) => (
                <div key={i} className="pd-review-item">
                  <div className="pd-reviewer-avatar">
                    {(r.user || "G")[0].toUpperCase()}
                  </div>
                  <div className="pd-review-content">
                    <div className="pd-reviewer-name">{r.user || "Guest"}</div>
                    <div className="pd-review-stars">
                      <span className="star active" style={{fontSize: "14px"}}>{"★".repeat(r.rating)}</span>
                    </div>
                    <p className="pd-review-text">{r.comment}</p>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
