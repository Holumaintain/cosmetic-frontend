import React from "react";
import MainLayout from "../components/layout/MainLayout";

// Offer Images
import misshaOffer from "../assets/images/products/missha-sunscreen.jpg";
import jumisoOffer from "../assets/images/products/jumiso-serum.jpg";
import palmersOffer from "../assets/images/products/palmers-offer.jpg";

const offers = [
  {
    name: "Missha Sun Gel SPF50+",
    img: misshaOffer,
    oldPrice: 16000,
    newPrice: 14800
  },
  {
    name: "Palmers Cocoa Butter Oil",
    img: palmersOffer,
    oldPrice: 25000,
    newPrice: 19500
  },
  {
    name: "Jumiso Vitamin C Serum",
    img: jumisoOffer,
    oldPrice: 23000,
    newPrice: 18500
  }
];

export default function Offers() {
  return (
    <MainLayout>
      <div className="container py-5">
        <h1 className="fw-bold mb-4 text-center">Special Offers</h1>
        <p className="mb-5 text-center text-muted">
          Grab our limited-time discounts on premium skincare and beauty products!
        </p>

        <div className="row g-4">
          {offers.map((offer, idx) => (
            <div key={idx} className="col-md-4">
              <div className="card p-3 shadow-sm hover-scale">
                <img
                  src={offer.img}
                  alt={offer.name}
                  className="img-fluid mb-3 rounded"
                />
                <h5 className="fw-bold">{offer.name}</h5>
                <p className="text-muted mb-2">
                  <span className="text-decoration-line-through">
                    ₦{offer.oldPrice.toLocaleString()}
                  </span>{" "}
                  → <span className="text-danger fw-bold">₦{offer.newPrice.toLocaleString()}</span>
                </p>
                <button className="btn btn-dark w-100">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="py-5 text-center">
          <h2 className="fw-bold mb-3">Stay Updated!</h2>
          <p>Subscribe to get notifications about new offers and exclusive deals.</p>
          <div className="d-flex justify-content-center gap-2 flex-wrap">
            <input type="email" className="form-control w-25" placeholder="Enter your email" />
            <button className="btn btn-dark">Subscribe</button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
