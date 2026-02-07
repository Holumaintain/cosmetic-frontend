// src/pages/UserDashboard.jsx
import React from "react";
import MainLayout from "../components/layout/MainLayout";

export default function UserDashboard() {
  return (
    <MainLayout>
      <div className="container py-5">
        <h1 className="fw-bold mb-4">My Account</h1>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="card p-4 shadow-sm hover-scale">
              <h5>Order History</h5>
              <p>View all your past orders and details.</p>
              <button className="btn btn-dark w-100">View Orders</button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card p-4 shadow-sm hover-scale">
              <h5>Profile Settings</h5>
              <p>Update your personal information and password.</p>
              <button className="btn btn-dark w-100">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
