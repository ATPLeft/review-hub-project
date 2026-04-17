import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Product.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // 🔥 NEW STATES
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);

  const navigate = useNavigate();


  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8080/api/products").then(res => res.json()),
      fetch("http://localhost:8080/api/reviews").then(res => res.json())
    ]).then(([productsData, reviewsData]) => {
      setProducts(productsData);
      setReviews(reviewsData);
      setIsLoading(false);
    });
  }, []);

  const getAverageRating = (productId) => {
    const productReviews = reviews.filter(
      r => r.productId === productId && r.status === "APPROVED"
    );
    if (productReviews.length === 0) return 0;

    const total = productReviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / productReviews.length).toFixed(1);
  };


  // 🔥 FILTER + SEARCH + SORT LOGIC
  let filteredProducts = products
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(p =>
      maxPrice ? p.price <= Number(maxPrice) : true
    )
    .filter(p => {
      if (category === "all") return true;
      return p.name.toLowerCase().includes(category);
    });

  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Helper: map product name to a nice Unsplash image
  const getProductImage = (p) => {
    const name = p.name.toLowerCase();
    
    // Prioritize name matches over whatever image URL the DB has, because the DB URLs seem duplicate/wrong
    if (name.includes("headphone") || name.includes("ear") || name.includes("airpod") || name.includes("headset")) return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80";
    if (name.includes("laptop") || name.includes("mac") || name.includes("pc")) return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80";
    if (name.includes("mobile") || name.includes("phone") || name.includes("smartphone")) return "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80";
    if (name.includes("watch") || name.includes("smartwatch")) return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80";
    if (name.includes("camera") || name.includes("lens") || name.includes("dslr")) return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80";
    if (name.includes("bluetooth") || name.includes("speaker") || name.includes("sound")) return "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80";
    if (name.includes("chair") || name.includes("gaming") || name.includes("seat")) return "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&auto=format&fit=crop&q=80";
    if (name.includes("tv") || name.includes("television") || name.includes("monitor")) return "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80";
    if (name.includes("keyboard")) return "https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&auto=format&fit=crop&q=80";
    if (name.includes("mouse")) return "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80";
    if (name.includes("tablet") || name.includes("ipad")) return "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80";
    
    // If the database has a specific image, and it didn't match the names above, use it.
    if (p.imageUrl && p.imageUrl.trim() !== "" && !p.imageUrl.includes("1611162617474")) {
      return p.imageUrl + "?w=400";
    }
    
    // Generic fallback tech product (a sleek white box / minimalist setup)
    return `https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=600&auto=format&fit=crop&q=80`;
  };

  return (
    <div className="container">

      {/* 🔥 FILTER BAR (Integrated Search) */}
      <div className="filter-container" style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        
        <input
          className="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flexGrow: 1, minWidth: '300px' }}
        />

        <input
          className="input"
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{ width: 'auto', margin: 0 }}
        />

        <select className="select" style={{ width: 'auto', margin: 0 }} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All</option>
          <option value="laptop">Laptop</option>
          <option value="mobile">Mobile</option>
          <option value="headphone">Headphones</option>
        </select>

        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>

      </div>

      {/* 🛍 PRODUCTS */}
      <div className="grid">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card">
              <div className="skeleton skeleton-img"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text-short"></div>
              <div className="skeleton skeleton-text" style={{marginTop: "20px"}}></div>
            </div>
          ))
        ) : filteredProducts.length === 0 ? (
          <p style={{ textAlign: "center" }}>No products found 😕</p>
        ) : (
          filteredProducts.slice(0, visibleCount).map((p) => (
            <div key={p.id} className="card">

            <img
              src={getProductImage(p)}
              alt={p.name}
              className="product-img"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=600&auto=format&fit=crop&q=80";
              }}
            />

            <h3 className="product-title">{p.name}</h3>
            <p className="price">₹{p.price}</p>

            <p className="rating">
              {getAverageRating(p.id) > 0
                ? "⭐".repeat(Math.round(getAverageRating(p.id))) +
                  ` (${getAverageRating(p.id)})`
                : "No rating"}
            </p>

            <button
              className="btn btn-review"
              onClick={() => navigate(`/product/${p.id}`)}
              style={{ width: "100%", marginTop: "10px" }}
            >
              View Details & Reviews
            </button>
          </div>
        )))}
      </div>

      {/* 🔄 LOAD MORE BUTTON */}
      {!isLoading && filteredProducts.length > visibleCount && (
        <div style={{ textAlign: "center", marginTop: "40px", marginBottom: "20px" }}>
          <button 
            className="btn btn-outline" 
            style={{ padding: "12px 30px", fontSize: "16px", borderRadius: "30px", background: "var(--card-bg)" }}
            onClick={() => setVisibleCount(prev => prev + 12)}
          >
            Load More Products ↓
          </button>
        </div>
      )}
    </div>
  );
}

export default Product;