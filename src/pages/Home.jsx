import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/products/ProductCard";

// Hero
import heroBg from "../assets/images/hero/hero-bg.jpg";

// Categories
import skincareCat from "../assets/images/categories/skincare.jpg";
import hairCat from "../assets/images/categories/hair.jpg";
import bathCat from "../assets/images/categories/bath-body.jpg";
import supplementCat from "../assets/images/categories/supplements.jpg";

// Testimonials
import user1 from "../assets/images/users/user1.jpg";
import user2 from "../assets/images/users/user2.jpg";
import user3 from "../assets/images/users/user3.jpg";

// Brands
import misshaLogo from "../assets/images/brands/missha-logo.jpg";
import jumisoLogo from "../assets/images/brands/jumiso-logo.jpg";
import niveaLogo from "../assets/images/brands/nivea-logo.jpg";
import palmersLogo from "../assets/images/brands/palmers-logo.jpg";

// Instagram
import insta1 from "../assets/images/instagram/insta1.jpg";
import insta2 from "../assets/images/instagram/insta2.jpg";
import insta3 from "../assets/images/instagram/insta3.jpg";
import insta4 from "../assets/images/instagram/insta4.jpg";
import insta5 from "../assets/images/instagram/insta5.jpg";
import insta6 from "../assets/images/instagram/insta6.jpg";

export default function Home() {
  const { products = [] } = useProducts();
  const [modalImg, setModalImg] = useState(null);

  /* ================= DYNAMIC FLAGS ================= */
  const featuredProducts = products.filter((p) => p.isFeatured);
  const hotDeals = products.filter((p) => p.isHotDeal);

  /* ================= FADE-IN ANIMATIONS ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  /* ================= TESTIMONIALS ================= */
  const testimonials = [
    {
      img: user1,
      comment: "Amazing products! My skin feels incredible.",
      name: "Verified Customer",
    },
    {
      img: user2,
      comment: "Instant glow! I can’t imagine using anything else.",
      name: "Verified Customer",
    },
    {
      img: user3,
      comment: "Such a game-changer! My skin feels so soft and radiant.",
      name: "Verified Customer",
    },
  ];

  return (
    <MainLayout>
      {/* ================= HERO ================= */}
      <section
        className="hero-section fade-in"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="hero-content">
          <h1>Luxury Beauty for Everyday Glow</h1>
          <p>Premium skincare & beauty products curated for you</p>
          <a href="/products" className="btn btn-hero">
            Shop Collection
          </a>
        </div>
        <div className="hero-badge badge-1">🔥 Best Seller</div>
        <div className="hero-badge badge-2">✨ New Arrival</div>
        <div className="hero-badge badge-3">💄 Premium Quality</div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="container py-5 fade-in">
        <h2 className="text-center mb-4">Shop by Category</h2>
        <div className="cards-grid">
          {[
            { name: "Skincare", img: skincareCat },
            { name: "Hair Care", img: hairCat },
            { name: "Bath & Body", img: bathCat },
            { name: "Supplements", img: supplementCat },
          ].map((cat, idx) => (
            <div key={idx} className="category-card">
              <img src={cat.img} alt={cat.name} />
              <h5>{cat.name}</h5>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="container py-5 fade-in">
        <h2 className="text-center mb-4">Featured Products</h2>
        {featuredProducts.length === 0 ? (
          <p className="text-center text-muted">No featured products yet.</p>
        ) : (
          <div className="cards-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                section="featured" // ✅ ensures featured fallback images are used
              />
            ))}
          </div>
        )}
      </section>

      {/* ================= HOT DEALS ================= */}
      <section className="py-5 bg-soft fade-in">
        <h2 className="text-center mb-4">Hot Deals</h2>
        {hotDeals.length === 0 ? (
          <p className="text-center text-muted">No hot deals available right now.</p>
        ) : (
          <div className="cards-grid container">
            {hotDeals.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                section="hotdeal" // ✅ ensures hotdeal fallback images are used
              />
            ))}
          </div>
        )}
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="container py-5 text-center fade-in">
        <h2 className="mb-4">Why Choose HOT-COSMETICS?</h2>
        <div className="cards-grid">
          <div className="card">
            <h5>Premium Quality</h5>
            <p>Only trusted brands & safe ingredients</p>
          </div>
          <div className="card">
            <h5>Fast Delivery</h5>
            <p>48-hour delivery across major cities</p>
          </div>
          <div className="card">
            <h5>24/7 Support</h5>
            <p>We’re always here to help</p>
          </div>
        </div>
      </section>

      {/* ================= BRAND STRIP ================= */}
      <section className="brands-strip fade-in">
        <div className="brands-marquee">
          {[misshaLogo, jumisoLogo, niveaLogo, palmersLogo].map((logo, idx) => (
            <div key={idx} className="brand-card">
              <img src={logo} alt="Brand" />
            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-5 bg-soft text-center fade-in">
        <h2 className="mb-4">What Our Customers Say</h2>
        <div className="cards-grid container">
          {testimonials.map((item, idx) => (
            <div key={idx} className="card">
              <img
                src={item.img}
                alt="User"
                className="rounded-circle mb-3"
                width="80"
                height="80"
              />
              <p>“{item.comment}”</p>
              <h6 className="fw-bold">{item.name}</h6>
            </div>
          ))}
        </div>
      </section>

      {/* ================= INSTAGRAM ================= */}
      <section className="container py-5 text-center fade-in">
        <h2 className="mb-4">Follow Us on Instagram</h2>
        <div className="cards-grid">
          {[insta1, insta2, insta3, insta4, insta5, insta6].map((img, idx) => (
            <div
              key={idx}
              className="instagram-card"
              onClick={() => setModalImg(img)}
            >
              <img src={img} alt="Instagram" />
              <div className="insta-overlay">
                <span>❤️</span>
                <span>📸</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram Modal */}
      {modalImg && (
        <div className="modal-overlay" onClick={() => setModalImg(null)}>
          <img src={modalImg} alt="Instagram Large" className="modal-img" />
        </div>
      )}

      {/* ================= NEWSLETTER ================= */}
      <section className="py-5 text-center container fade-in">
        <h2>Join Our Newsletter</h2>
        <p>Exclusive offers & beauty tips straight to your inbox</p>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button className="btn btn-dark">Subscribe</button>
        </div>
      </section>
    </MainLayout>
  );
}
