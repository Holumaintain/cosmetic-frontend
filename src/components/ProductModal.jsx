import React from "react";
import { useCart } from "../context/CartContext";

// fallback images (reuse what you already have)
import vitcImg from "../assets/images/products/vitc.jpg";
import sheaImg from "../assets/images/products/shea.jpg";
import multivitaminsImg from "../assets/images/products/multivitamins.jpg";
import probioticsImg from "../assets/images/products/probiotics.jpg";
import herbalImg from "../assets/images/products/herbal.jpg";

const fallbackImages = [
  vitcImg,
  sheaImg,
  multivitaminsImg,
  probioticsImg,
  herbalImg
];

const getFallbackImage = () =>
  fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content p-3">
          <div className="modal-header">
            <h5 className="modal-title">{product.name}</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <img
              src={product.image || getFallbackImage()}
              alt={product.name}
              className="img-fluid mb-3"
              style={{ objectFit: "cover" }}
            />

            <p>{product.description || "No description available."}</p>

            <p className="fw-bold">
              ₦{product.price.toLocaleString()}
            </p>
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-dark"
              onClick={() => {
                addToCart({ ...product, qty: 1 });
                onClose();
              }}
            >
              Add to Cart
            </button>

            <button
              className="btn btn-outline-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
