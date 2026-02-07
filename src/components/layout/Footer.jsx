// src/components/layout/Footer.jsx
import React from "react";
import logo from "../../assets/images/logo.png"; // your logo
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white pt-5">
      <div className="container">
        <div className="row">

          {/* ================= LOGO + COPYRIGHT (LEFT) ================= */}
          <div className="col-md-3 mb-4 logo-col">
            <img src={logo} alt="Allure Beauty Store" className="footer-logo mb-3" />
            <p>Copyright &copy; {new Date().getFullYear()} HOT COSMETICS </p>
            <p>All rights reserved</p>

            {/* Social Icons */}
            <div className="social-icons mt-3">
              <a href="#" className="text-white me-2"><FaFacebookF /></a>
              <a href="#" className="text-white me-2"><FaTwitter /></a>
              <a href="#" className="text-white"><FaInstagram /></a>
            </div>
          </div>

          {/* ================= MENU GRID (RIGHT) ================= */}
          <div className="menu-grid col-md-9">
            {/* Company */}
            <div className="col-md-3 mb-4">
              <h6 className="fw-bold mb-3">Company</h6>
              <ul className="list-unstyled">
                <li><Link to="/wholesale" className="text-white text-decoration-none">Wholesale</Link></li>
                <li><Link to="/shipping-return" className="text-white text-decoration-none">Shipping and Return</Link></li>
                <li><Link to="/secure-shopping" className="text-white text-decoration-none">Secure Shopping</Link></li>
                <li><Link to="/international-shipping" className="text-white text-decoration-none">International Shipping</Link></li>
                <li><Link to="/group-sale" className="text-white text-decoration-none">Group Sale</Link></li>
              </ul>
            </div>

            {/* Information */}
            <div className="col-md-3 mb-4">
              <h6 className="fw-bold mb-3">Information</h6>
              <ul className="list-unstyled">
                <li><Link to="/about" className="text-white text-decoration-none">About Us</Link></li>
                <li><Link to="/delivery-info" className="text-white text-decoration-none">Delivery Information</Link></li>
                <li><Link to="/return" className="text-white text-decoration-none">Return</Link></li>
                <li><Link to="/sitemap" className="text-white text-decoration-none">Sitemap</Link></li>
                <li><Link to="/contact" className="text-white text-decoration-none">Contact Us</Link></li>
                <li><Link to="/privacy" className="text-white text-decoration-none">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* My Account */}
            <div className="col-md-3 mb-4">
              <h6 className="fw-bold mb-3">My Account</h6>
              <ul className="list-unstyled">
                <li><Link to="/account" className="text-white text-decoration-none">My Account</Link></li>
                <li><Link to="/cart" className="text-white text-decoration-none">View Bag</Link></li>
                <li><Link to="/wishlist" className="text-white text-decoration-none">My Wishlist</Link></li>
              </ul>
            </div>

            {/* Help */}
            <div className="col-md-3 mb-4">
              <h6 className="fw-bold mb-3">Help</h6>
              <ul className="list-unstyled">
                <li><Link to="/track-order" className="text-white text-decoration-none">Track Order</Link></li>
                <li><Link to="/faq" className="text-white text-decoration-none">FAQ</Link></li>
                <li><Link to="/support" className="text-white text-decoration-none">Support</Link></li>
              </ul>
            </div>
          </div> {/* end menu-grid */}

        </div> {/* end row */}

        <hr className="border-secondary" />
        <p className="text-center small mb-0">
          Designed with ❤️ for beauty lovers
        </p>
      </div>
    </footer>
  );
};

export default Footer;
