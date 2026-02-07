import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart = [], total, clearCart } = useCart();
  const [success, setSuccess] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();

    if (cart.length === 0) return;

    setSuccess(true);
    clearCart();
  };

  return (
    <MainLayout>
      <div className="container py-5">
        <h1 className="fw-bold mb-4 text-center">Checkout</h1>

        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <div className="row g-4">
            {/* ================= Billing Form ================= */}
            <div className="col-md-6">
              <form onSubmit={handlePayment} className="card p-4 shadow-sm">
                <h5 className="mb-3">Billing Information</h5>

                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Postal Code"
                    className="form-control"
                    required
                  />
                </div>

                <button className="btn btn-dark w-100">
                  Pay ₦{total.toLocaleString()}
                </button>

                {success && (
                  <p className="mt-3 text-success text-center">
                    Payment Successful! Thank you for your order.
                  </p>
                )}
              </form>
            </div>

            {/* ================= Order Summary ================= */}
            <div className="col-md-6">
              <div className="card p-4 shadow-sm">
                <h5 className="mb-3">Order Summary</h5>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex justify-content-between mb-2"
                  >
                    <div>
                      <strong>{item.name}</strong>
                      <div className="text-muted small">
                        Qty: {item.qty}
                      </div>
                    </div>
                    <span>
                      ₦{(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                ))}

                <hr />

                <div className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
