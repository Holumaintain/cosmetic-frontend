// src/pages/Products.jsx
import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import { useCart } from "../context/CartContext";

// ✅ LOCAL FALLBACK IMAGES
import vitcImg from "../assets/images/products/vitc.jpg";
import sheaImg from "../assets/images/products/shea.jpg";
import multivitaminsImg from "../assets/images/products/multivitamins.jpg";
import probioticsImg from "../assets/images/products/probiotics.jpg";
import herbalImg from "../assets/images/products/herbal.jpg";

const fallbackImages = [vitcImg, sheaImg, multivitaminsImg, probioticsImg, herbalImg];

const fallbackMap = [
  { keyword: "multivitamin", image: multivitaminsImg },
  { keyword: "vit c", image: vitcImg },
  { keyword: "vitamin", image: vitcImg },
  { keyword: "shea", image: sheaImg },
  { keyword: "probiotic", image: probioticsImg },
  { keyword: "herbal", image: herbalImg },
];

const getFallbackImage = (name) => {
  const lowerName = name?.toLowerCase() || "";
  for (const { keyword, image } of fallbackMap) {
    if (lowerName.includes(keyword)) return image;
  }
  return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
};

// ✅ Dummy products (replace with API fetch if needed)
const allProducts = [
  { _id: "1", name: "Vitamin C Serum", price: 12000, image: vitcImg, description: "Brightens skin and reduces dark spots." },
  { _id: "2", name: "Shea Butter Cream", price: 8000, image: sheaImg, description: "Deeply moisturizes and softens skin." },
  { _id: "3", name: "Multivitamin Tablets", price: 15000, description: "Supports overall health and immunity." },
  { _id: "4", name: "Probiotic Capsules", price: 10000, description: "Promotes gut health and digestion." },
  { _id: "5", name: "Herbal Soap", price: 5000, image: herbalImg, description: "Gentle cleansing with herbal ingredients." },
];

export default function Products() {
  const { addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); // ✅ Modal state

  // Filter products whenever search or category changes
  useEffect(() => {
    let filtered = allProducts;

    if (searchQuery) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (categoryQuery) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(categoryQuery.toLowerCase()));
    }

    setFilteredProducts(filtered);
  }, [searchQuery, categoryQuery]);

  return (
    <MainLayout>
      <main className="site-main container py-5">
        <h1 className="mb-4 text-center">
          {searchQuery
            ? `Search results for "${searchQuery}"`
            : categoryQuery
            ? `Category: ${categoryQuery}`
            : "All Products"}
        </h1>

        {filteredProducts.length === 0 ? (
          <p className="text-center">No products found.</p>
        ) : (
          <div className="row g-4">
            {filteredProducts.map(product => (
              <div key={product._id} className="col-md-4">
                <div
                  className="card h-100 shadow-sm cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.image || getFallbackImage(product.name)}
                    alt={product.name}
                    onError={(e) => (e.target.src = getFallbackImage(product.name))}
                    className="card-img-top"
                    style={{ height: 200, objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text fw-bold">₦{product.price.toLocaleString()}</p>
                    <button
                      className="btn btn-dark mt-auto"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent opening modal
                        addToCart({ ...product, qty: 1 });
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= PRODUCT MODAL ================= */}
        {selectedProduct && (
          <div
            className="modal fade show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content p-3">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedProduct.name}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedProduct(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <img
                    src={selectedProduct.image || getFallbackImage(selectedProduct.name)}
                    alt={selectedProduct.name}
                    onError={(e) => (e.target.src = getFallbackImage(selectedProduct.name))}
                    className="img-fluid mb-3"
                    style={{ objectFit: "cover" }}
                  />
                  <p>{selectedProduct.description || "No description available."}</p>
                  <p className="fw-bold">₦{selectedProduct.price.toLocaleString()}</p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      addToCart({ ...selectedProduct, qty: 1 });
                      setSelectedProduct(null);
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </MainLayout>
  );
}
