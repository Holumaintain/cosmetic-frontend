import React from "react";
import { useCart } from "../../context/CartContext";
import { Link, useLocation } from "react-router-dom";
import fallbackImg from "../../assets/images/products/vitc.jpg";

export default function FloatingCart() {
  const { cart, total } = useCart();
  const location = useLocation();

  // ✅ SHOW ONLY ON CART PAGE
  if (location.pathname !== "/cart" || !cart || cart.length === 0) {
    return null;
  }

  return (
    <div
      className="floating-cart position-fixed bottom-0 end-0 m-4 p-3 shadow-lg rounded bg-dark text-light"
      style={{ width: "300px", zIndex: 1050 }}
    >
      <h5 className="fw-bold mb-3">Your Cart</h5>

      <ul
        className="list-unstyled mb-3"
        style={{ maxHeight: "200px", overflowY: "auto" }}
      >
        {cart.map((item) => (
          <li
            key={item._id}
            className="d-flex align-items-center mb-2"
          >
            <img
              src={item.image || fallbackImg}
              alt={item.name}
              onError={(e) => (e.target.src = fallbackImg)}
              className="me-2 rounded"
              style={{
                width: 50,
                height: 50,
                objectFit: "cover",
              }}
            />

            <div className="flex-grow-1">
              <small className="fw-semibold">{item.name}</small>
              <div className="d-flex justify-content-between">
                <span>Qty: {item.qty}</span>
                <span>
                  ₦{(item.price * item.qty).toLocaleString()}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="d-flex justify-content-between fw-bold mb-3">
        <span>Total:</span>
        <span>₦{total.toLocaleString()}</span>
      </div>

      <Link to="/checkout" className="btn btn-light w-100">
        Proceed to Checkout
      </Link>
    </div>
  );
}
