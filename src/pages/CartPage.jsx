import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { useCart } from "../context/CartContext";

// ✅ MULTIPLE LOCAL FALLBACK IMAGES
import vitcImg from "../assets/images/products/vitc.jpg";
import sheaImg from "../assets/images/products/shea.jpg";
import multivitaminsImg from "../assets/images/products/multivitamins.jpg";
import probioticsImg from "../assets/images/products/probiotics.jpg";
import herbalImg from "../assets/images/products/herbal.jpg";

// Fallback images array for random selection
const fallbackImages = [vitcImg, sheaImg, multivitaminsImg, probioticsImg, herbalImg];

// Keyword → fallback image mapping (priority order matters!)
const fallbackMap = [
  { keyword: "multivitamin", image: multivitaminsImg },
  { keyword: "vit c", image: vitcImg },
  { keyword: "vitamin", image: vitcImg },
  { keyword: "shea", image: sheaImg },
  { keyword: "probiotic", image: probioticsImg },
  { keyword: "herbal", image: herbalImg },
];

/**
 * Returns a fallback image based on product name
 * - Matches keywords in priority order
 * - Random fallback if no match
 */
const getFallbackImage = (name) => {
  const lowerName = name?.toLowerCase() || "";

  for (const { keyword, image } of fallbackMap) {
    if (lowerName.includes(keyword)) {
      return image;
    }
  }

  // Random fallback for unknown products
  return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
};

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
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="card p-3 mb-3 d-flex flex-row align-items-center shadow-sm"
                  >
                    {/* ✅ IMAGE WITH DETERMINISTIC & RANDOM FALLBACKS */}
                    <img
                      src={item.image || getFallbackImage(item.name)}
                      alt={item.name}
                      onError={(e) => (e.target.src = getFallbackImage(item.name))}
                      className="me-3 rounded"
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />

                    <div className="flex-grow-1">
                      <h5 className="mb-1">{item.name}</h5>
                      <p className="text-muted mb-2">
                        ₦{item.price.toLocaleString()}
                      </p>

                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => decreaseQty(item._id)}
                        >
                          −
                        </button>
                        <span className="fw-bold">{item.qty}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => increaseQty(item._id)}
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
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
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
