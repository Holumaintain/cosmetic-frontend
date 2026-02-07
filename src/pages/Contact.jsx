// src/pages/Contact.jsx
import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";

export default function Contact() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Your message has been sent successfully!");
  };

  return (
    <MainLayout>
      <div className="container py-5">
        <h1 className="fw-bold mb-4 text-center">Contact Us</h1>
        <div className="row g-4">
          <div className="col-md-6">
            <h5>Get In Touch</h5>
            <p>📞 080-2963-2889</p>
            <p>✉ Hot@cosmetics.com.ng</p>
            <p>🏢 123 Elegance St, Lagos, Nigeria</p>
          </div>

          <div className="col-md-6">
            <h5>Send a Message</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Name" required />
              </div>
              <div className="mb-3">
                <input type="email" className="form-control" placeholder="Email" required />
              </div>
              <div className="mb-3">
                <textarea className="form-control" placeholder="Message" rows="4" required></textarea>
              </div>
              <button className="btn btn-dark w-100">Send Message</button>
            </form>
            {message && <p className="mt-3 text-success">{message}</p>}
          </div>
        </div>

        <div className="ratio ratio-16x9 rounded overflow-hidden shadow-sm mt-5">
          <iframe
            title="HOT-COSMETICS Location"
            src="https://www.google.com/maps?q=Lagos%20Nigeria&output=embed"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </MainLayout>
  );
}
