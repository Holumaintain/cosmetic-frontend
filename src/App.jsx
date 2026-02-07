// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products"; // ✅ merged file
import Categories from "./pages/Categories";
import Offers from "./pages/Offers";
import CartPage from "./pages/CartPage";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

// Layout Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FloatingCart from "./components/layout/FloatingCart";

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Helmet>
              <title>HOT-COSMETICS | Luxury Skincare & Beauty</title>
            </Helmet>

            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />

                {/* ✅ SINGLE PRODUCTS FILE HANDLES BOTH LIST & DETAIL */}
                <Route path="/products/*" element={<Products />} />

                <Route path="/categories" element={<Categories />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cartpage" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
                <Route path="/dashboard/*" element={<UserDashboard />} />

                {/* Fallback */}
                <Route path="*" element={<Home />} />
              </Routes>
              <FloatingCart />
              <Footer />
            </Router>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}
