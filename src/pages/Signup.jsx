// src/pages/Signup.jsx
import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";

export default function Signup() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <MainLayout>
      <div className="container py-5">
        <h1 className="fw-bold mb-4 text-center">Sign Up</h1>
        <div className="row justify-content-center">
          <div className="col-md-5">
            <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
              <div className="mb-3">
                <input type="text" placeholder="Full Name" className="form-control" required />
              </div>
              <div className="mb-3">
                <input type="email" placeholder="Email" className="form-control" required />
              </div>
              <div className="mb-3">
                <input type="password" placeholder="Password" className="form-control" required />
              </div>
              <button className="btn btn-dark w-100">Sign Up</button>
              {success && <p className="mt-3 text-success text-center">Account created successfully!</p>}
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
