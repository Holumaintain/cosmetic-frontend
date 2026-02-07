// src/pages/AdminDashboard.jsx
import React from "react";
import MainLayout from "../components/layout/MainLayout";

export default function AdminDashboard() {
  return (
    <MainLayout>
      <div className="container py-5">
        <h1 className="fw-bold mb-4">Admin Dashboard</h1>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card p-4 shadow-sm text-center hover-scale">
              <h5>Manage Products</h5>
              <p>Add, edit, or remove products from your store.</p>
              <button className="btn btn-dark w-100">Go</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-4 shadow-sm text-center hover-scale">
              <h5>Orders</h5>
              <p>View recent customer orders and status.</p>
              <button className="btn btn-dark w-100">Go</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-4 shadow-sm text-center hover-scale">
              <h5>Users</h5>
              <p>Manage user accounts and permissions.</p>
              <button className="btn btn-dark w-100">Go</button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
