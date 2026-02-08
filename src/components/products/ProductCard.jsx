// src/components/products/ProductCard.jsx
import React from "react";
import { useCart } from "../../context/CartContext";

// ================= FEATURED PRODUCT IMAGES =================
import featuredVitc from "../../assets/images/products/featured/vitc.jpg";
import featuredShea from "../../assets/images/products/featured/shea.jpg";
import featuredMultivitamins from "../../assets/images/products/featured/multivitamins.jpg";
import featuredProbiotics from "../../assets/images/products/featured/probiotics.jpg";
import featuredHerbal from "../../assets/images/products/featured/herbal.jpg";

// ================= HOT DEALS IMAGES =================
import hotdealVitc from "../../assets/images/products/hotdeals/vitc.jpg";
import hotdealShea from "../../assets/images/products/hotdeals/shea.jpg";
import hotdealMultivitamins from "../../assets/images/products/hotdeals/multivitamins.jpg";
import hotdealProbiotics from "../../assets/images/products/hotdeals/probiotics.jpg";
import hotdealHerbal from "../../assets/images/products/hotdeals/herbal.jpg";

// ================= GENERIC PRODUCT IMAGES =================
import vitcImg from "../../assets/images/products/vitc.jpg";
import sheaImg from "../../assets/images/products/shea.jpg";
import multivitaminsImg from "../../assets/images/products/multivitamins.jpg";
import probioticsImg from "../../assets/images/products/probiotics.jpg";
import herbalImg from "../../assets/images/products/herbal.jpg";

// ================= FALLBACK IMAGE MAP =================
const fallbackMap = {
  featured: {
    "vit c": featuredVitc,
    shea: featuredShea,
    multivitamin: featuredMultivitamins,
    probiotic: featuredProbiotics,
    herbal: featuredHerbal,
  },
  hotdeal: {
    "vit c": hotdealVitc,
    shea: hotdealShea,
    multivitamin: hotdealMultivitamins,
    probiotic: hotdealProbiotics,
    herbal: hotdealHerbal,
  },
  generic: {
    "vit c": vitcImg,
    shea: sheaImg,
    multivitamin: multivitaminsImg,
    probiotic: probioticsImg,
    herbal: herbalImg,
  },
};

// ================= HELPER FUNCTION TO GET IMAGE =================
const getProductImage = (product) => {
  const nameKey = product.name?.toLowerCase() || "";

  // Auto-detect section: featured → hotdeal → generic
  const sections = ["featured", "hotdeal", "generic"];

  for (const section of sections) {
    const sectionMap = fallbackMap[section];
    for (const key of Object.keys(sectionMap)) {
      if (nameKey.includes(key)) return sectionMap[key];
    }
  }

  // Default fallback
  return vitcImg;
};

// ================= PRODUCT CARD COMPONENT =================
export default function ProductCard({ product, mode = "add" }) {
  const { cart, increaseQty, decreaseQty, removeFromCart, addToCart } = useCart();

  // Lock image for cart
  const image = product.image || getProductImage(product);

  // Find item in cart
  const cartItem = cart.find((item) => item._id === product._id);
  const qty = cartItem ? cartItem.qty : 0;

  return (
    <div className="card p-3 shadow-sm h-100">
      <img
        src={image}
        alt={product.name}
        onError={(e) => (e.target.src = getProductImage(product))} // fallback
        className="mb-3 rounded"
        style={{ width: "100%", height: 200, objectFit: "cover" }}
        loading="lazy"
      />

      <h5 className="mb-2">{product.name}</h5>
      <p className="text-muted mb-3">₦{product.price.toLocaleString()}</p>

      {/* ===== MODE: "add" shows Add to Cart button, "cart" shows qty controls ===== */}
      {mode === "add" ? (
        <button
          className="btn btn-dark w-100"
          onClick={() =>
            addToCart({
              ...product,
              cartImage: image, // locked image for cart
            })
          }
        >
          🛒 Add to Cart
        </button>
      ) : (
        <>
          <div className="d-flex align-items-center gap-2 mb-2">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => decreaseQty(product._id)}
              disabled={qty === 0}
            >
              −
            </button>
            <span className="fw-bold">{qty}</span>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => increaseQty(product._id, product)}
            >
              +
            </button>
          </div>

          <button
            className="btn btn-outline-danger w-100"
            onClick={() => removeFromCart(product._id)}
            disabled={qty === 0}
          >
            Remove
          </button>
        </>
      )}
    </div>
  );
}
