// src/pages/Categories.jsx
import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

// Category Images
import skincareImg from "../assets/images/categories/skincare.jpg";
import makeupImg from "../assets/images/categories/makeup.jpg";
import haircareImg from "../assets/images/categories/haircare.jpg";
import bodycareImg from "../assets/images/categories/bodycare.jpg";

// ✅ Update links to go to /offers
const categories = [
  { name: "Skincare", img: skincareImg, link: "/offers" },
  { name: "Makeup", img: makeupImg, link: "/offers" },
  { name: "Haircare", img: haircareImg, link: "/offers" },
  { name: "Body Care", img: bodycareImg, link: "/offers" },
];

export default function Categories() {
  return (
    <MainLayout>
      <div className="container py-5">
        <h1 className="fw-bold mb-4 text-center">Shop by Category</h1>
        <p className="text-center text-muted mb-5">
          Explore our range of premium skincare, makeup, and body care products.
        </p>

        <div className="row g-4">
          {categories.map((cat, idx) => (
            <div key={idx} className="col-md-3">
              <Link
                to={cat.link}
                className="text-decoration-none text-dark"
              >
                <div className="card shadow-sm hover-scale h-100">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="img-fluid rounded-top"
                  />
                  <div className="card-body text-center">
                    <h5 className="fw-bold">{cat.name}</h5>
                    <p className="mb-0">Shop Now →</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="py-5 text-center mt-5">
          <h2 className="fw-bold mb-3">Discover Your Favorites</h2>
          <p>Hand-picked products for glowing skin and beauty at your fingertips.</p>
          <Link to="/offers" className="btn btn-dark btn-lg">
            Browse All Offers
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
