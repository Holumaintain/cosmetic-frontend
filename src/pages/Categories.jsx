import React from "react";
import MainLayout from "../components/layout/MainLayout";

// Category Images
import skincareImg from "../assets/images/categories/skincare.jpg";
import makeupImg from "../assets/images/categories/makeup.jpg";
import haircareImg from "../assets/images/categories/haircare.jpg";
import bodycareImg from "../assets/images/categories/bodycare.jpg";

const categories = [
  { name: "Skincare", img: skincareImg, link: "/products?category=Skincare" },
  { name: "Makeup", img: makeupImg, link: "/products?category=Makeup" },
  { name: "Haircare", img: haircareImg, link: "/products?category=Haircare" },
  { name: "Body Care", img: bodycareImg, link: "/products?category=BodyCare" },
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
              <a href={cat.link} className="text-decoration-none text-dark">
                <div className="card shadow-sm hover-scale">
                  <img src={cat.img} alt={cat.name} className="img-fluid rounded-top" />
                  <div className="card-body text-center">
                    <h5 className="fw-bold">{cat.name}</h5>
                    <p>Shop Now →</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Featured Category CTA */}
        <div className="py-5 text-center mt-5">
          <h2 className="fw-bold mb-3">Discover Your Favorites</h2>
          <p>Hand-picked products for glowing skin and beauty at your fingertips.</p>
          <a href="/products" className="btn btn-dark btn-lg">Browse All Products</a>
        </div>
      </div>
    </MainLayout>
  );
}
