import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

// Featured product images
import featuredVitc from "../../assets/images/products/featured/vitc.jpg";
import featuredShea from "../../assets/images/products/featured/shea.jpg";
import featuredMultivitamins from "../../assets/images/products/featured/multivitamins.jpg";
import featuredProbiotics from "../../assets/images/products/featured/probiotics.jpg";
import featuredHerbal from "../../assets/images/products/featured/herbal.jpg";

// Hot Deals images
import hotdealVitc from "../../assets/images/products/hotdeals/vitc.jpg";
import hotdealShea from "../../assets/images/products/hotdeals/shea.jpg";
import hotdealMultivitamins from "../../assets/images/products/hotdeals/multivitamins.jpg";
import hotdealProbiotics from "../../assets/images/products/hotdeals/probiotics.jpg";
import hotdealHerbal from "../../assets/images/products/hotdeals/herbal.jpg";

export default function ProductCard({ product, section = "featured" }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Choose fallback image based on section and product name
  const getFallbackImage = () => {
    const name = product.name.toLowerCase();

    if (section === "hotdeal") {
      if (name.includes("vitamin c")) return hotdealVitc;
      if (name.includes("shea")) return hotdealShea;
      if (name.includes("multivitamin")) return hotdealMultivitamins;
      if (name.includes("probiotic")) return hotdealProbiotics;
      if (name.includes("herbal")) return hotdealHerbal;
      return hotdealVitc; // default hotdeal
    }

    // Featured / default
    if (name.includes("vitamin c")) return featuredVitc;
    if (name.includes("shea")) return featuredShea;
    if (name.includes("multivitamin")) return featuredMultivitamins;
    if (name.includes("probiotic")) return featuredProbiotics;
    if (name.includes("herbal")) return featuredHerbal;
    return featuredVitc; // default featured
  };

  return (
    <div className="product-card rounded shadow-sm p-3 text-center">
      {/* PRODUCT IMAGE */}
      <img
        src={product.image || getFallbackImage()}
        alt={product.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = getFallbackImage();
        }}
        className="img-fluid mb-2 rounded"
        style={{ cursor: "pointer", height: 220, objectFit: "cover" }}
        onClick={() => navigate(`/products/${product._id || product.name}`)}
      />

      {/* PRODUCT NAME */}
      <h6
        className="fw-bold"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/products/${product._id || product.name}`)}
      >
        {product.name}
      </h6>

      {/* SKIN TYPES */}
      {Array.isArray(product.skinTypes) && product.skinTypes.length > 0 && (
        <div className="mb-2">
          {product.skinTypes.map((type, idx) => (
            <span
              key={idx}
              className="badge bg-secondary me-1"
              style={{ fontSize: "0.7rem" }}
            >
              {type}
            </span>
          ))}
        </div>
      )}

      {/* RATING */}
      {product.rating > 0 && (
        <p className="text-warning mb-1">
          {"★".repeat(Math.round(product.rating))}
          <span className="text-muted ms-1">({product.rating})</span>
        </p>
      )}

      {/* PRICE */}
      <p>
        {product.original && (
          <span className="text-decoration-line-through text-muted me-1">
            ₦{product.original.toLocaleString()}
          </span>
        )}
        <span className="fw-bold text-dark">₦{product.price.toLocaleString()}</span>
      </p>

      {/* ADD TO CART */}
      <button className="btn btn-dark w-100" onClick={() => addToCart(product)}>
        🛒 Add to Cart
      </button>
    </div>
  );
}
