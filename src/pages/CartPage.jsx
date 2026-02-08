// src/pages/CartPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { useCart } from "../context/CartContext";

// ================= FEATURED PRODUCT IMAGES =================
import featuredVitc from "../assets/images/products/featured/vitc.jpg";
import featuredShea from "../assets/images/products/featured/shea.jpg";
import featuredMultivitamins from "../assets/images/products/featured/multivitamins.jpg";
import featuredProbiotics from "../assets/images/products/featured/probiotics.jpg";
import featuredHerbal from "../assets/images/products/featured/herbal.jpg";

// ================= HOT DEALS IMAGES =================
import hotdealVitc from "../assets/images/products/hotdeals/vitc.jpg";
import hotdealShea from "../assets/images/products/hotdeals/shea.jpg";
import hotdealMultivitamins from "../assets/images/products/hotdeals/multivitamins.jpg";
import hotdealProbiotics from "../assets/images/products/hotdeals/probiotics.jpg";
import hotdealHerbal from "../assets/images/products/hotdeals/herbal.jpg";

// ================= GENERIC PRODUCT IMAGES =================
import vitcImg from "../assets/images/products/vitc.jpg";
import sheaImg from "../assets/images/products/shea.jpg";
import multivitaminsImg from "../assets/images/products/multivitamins.jpg";
import probioticsImg from "../assets/images/products/probiotics.jpg";
import herbalImg from "../assets/images/products/herbal.jpg";

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

// ================= HELPER FUNCTION =================
const getProductImage = (product) => {
  const type = product.type?.toLowerCase() || "generic"; // 'featured', 'hotdeal', or 'generic'
  const nameKey = product.name?.toLowerCase() || "";

  // 1️⃣ Try type-specific mapping first
  if (fallbackMap[type]) {
    for (const key of Object.keys(fallbackMap[type])) {
      if (nameKey.includes(key)) return fallbackMap[type][key];
    }
  }

  // 2️⃣ Fallback to generic mapping
  for (const key of Object.keys(fallbackMap.generic)) {
    if (nameKey.includes(key)) return fallbackMap.generic[key];
  }

  // 3️⃣ Last resort: random generic image
  const genericImages = Object.values(fallbackMap.generic);
  return genericImages[Math.floor(Math.random() * genericImages.length)];
};

// ================= CART PAGE =================
export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart, total } = useCart();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <main className="site-main container py-5">
        {!cart || cart.length === 0 ? (
          <div className="text-center py-5">
            <h2>Your cart is empty</h2>
          </div>
        ) : (
          <>
            <h1 className="fw-bold mb-4 text-center">My Cart</h1>

            <div className="row g-4">
              {/* ================= CART ITEMS ================= */}
              <div className="col-md-8">
                {cart.map((item) => {
                  const id = item._id || item.name; // ensure consistent identifier
                  return (
                    <div
                      key={id}
                      className="card p-3 mb-3 d-flex flex-row align-items-center shadow-sm"
                    >
                      {/* IMAGE WITH DYNAMIC FALLBACK */}
                      <img
                        src={item.image || getProductImage(item)}
                        alt={item.name}
                        onError={(e) => (e.target.src = getProductImage(item))}
                        className="me-3 rounded"
                        style={{ width: 100, height: 100, objectFit: "cover" }}
                      />

                      <div className="flex-grow-1">
                        <h5 className="mb-1">{item.name}</h5>
                        <p className="text-muted mb-2">
                          ₦{item.price.toLocaleString()}
                        </p>

                        {/* INCREASE / DECREASE QTY */}
                        <div className="d-flex align-items-center gap-2">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => decreaseQty(id)}
                            disabled={item.qty <= 0}
                          >
                            −
                          </button>
                          <span className="fw-bold">{item.qty}</span>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => increaseQty(id, item)}
                          >
                            +
                          </button>
                        </div>

                        <p className="mt-2 mb-0">
                          Subtotal: ₦{(item.price * item.qty).toLocaleString()}
                        </p>
                      </div>

                      <button
                        className="btn btn-outline-danger ms-3"
                        onClick={() => removeFromCart(id)}
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* ================= ORDER SUMMARY ================= */}
              <div className="col-md-4">
                <div className="card p-4 shadow-sm">
                  <h5 className="fw-bold mb-3">Order Summary</h5>

                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping</span>
                    <span>₦1,500</span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between fw-bold mb-3">
                    <span>Total</span>
                    <span>₦{(total + 1500).toLocaleString()}</span>
                  </div>

                  <button
                    className="btn btn-dark w-100 mb-2"
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to Checkout
                  </button>

                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </MainLayout>
  );
}
