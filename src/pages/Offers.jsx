import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { useCart } from "../context/CartContext";
import ProductModal from "../components/ProductModal";

// ✅ OFFER IMAGES
import misshaOffer from "../assets/images/offer/img/missha-sunscreen.jpg";
import jumisoOffer from "../assets/images/offer/img/jumiso-serum.jpg";
import palmersOffer from "../assets/images/offer/img/palmers-offer.jpg";

// Initial offers
const offers = [
  {
    _id: "offer-1",
    name: "Missha Sun Gel SPF50+",
    image: misshaOffer,
    oldPrice: 16000,
    price: 14800,
    description: "Lightweight sunscreen with high UV protection."
  },
  {
    _id: "offer-2",
    name: "Palmers Cocoa Butter Oil",
    image: palmersOffer,
    oldPrice: 25000,
    price: 19500,
    description: "Deeply nourishes and improves skin elasticity."
  },
  {
    _id: "offer-3",
    name: "Jumiso Vitamin C Serum",
    image: jumisoOffer,
    oldPrice: 23000,
    price: 18500,
    description: "Brightens skin and fades dark spots."
  }
];

// ✅ Helper to synchronize fallbacks across cards
const createFallbackManager = (images) => {
  // Keep track of which image is currently in use
  let usedImages = new Set();

  const getFallback = (failedImage) => {
    const available = images.filter(img => img !== failedImage && !usedImages.has(img));

    let fallback;
    if (available.length === 0) {
      // All used, reset
      usedImages.clear();
      fallback = images.find(img => img !== failedImage);
    } else {
      // Pick random from available
      fallback = available[Math.floor(Math.random() * available.length)];
    }

    // Mark as used
    usedImages.add(fallback);
    return fallback;
  };

  const reset = () => {
    usedImages.clear();
  };

  return { getFallback, reset };
};

// Create fallback manager instance
const fallbackManager = createFallbackManager([misshaOffer, jumisoOffer, palmersOffer]);

export default function Offers() {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <MainLayout>
      <div className="container py-5">
        <h1 className="fw-bold mb-4 text-center">Special Offers</h1>
        <p className="mb-5 text-center text-muted">
          Grab our limited-time discounts on premium skincare and beauty products!
        </p>

        <div className="row g-4">
          {offers.map((offer) => (
            <div key={offer._id} className="col-md-4">
              <div
                className="card p-3 shadow-sm hover-scale h-100 cursor-pointer"
                onClick={() => setSelectedProduct(offer)}
              >
                {/* ✅ Image with synchronized fallback */}
                <img
                  src={offer.image}
                  alt={offer.name}
                  onError={(e) => {
                    e.target.src = fallbackManager.getFallback(e.target.src);
                  }}
                  className="img-fluid mb-3 rounded"
                />

                <h5 className="fw-bold">{offer.name}</h5>

                <p className="text-muted mb-2">
                  <span className="text-decoration-line-through">
                    ₦{offer.oldPrice.toLocaleString()}
                  </span>{" "}
                  →{" "}
                  <span className="text-danger fw-bold">
                    ₦{offer.price.toLocaleString()}
                  </span>
                </p>

                <button
                  className="btn btn-dark w-100 mt-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({
                      ...offer,
                      image: offer.image, // Keep original, cart fallback handled separately
                      qty: 1
                    });
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    </MainLayout>
  );
}
