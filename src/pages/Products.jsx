import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import { useCart } from "../context/CartContext";
import ProductModal from "../components/ProductModal";

// Local Images
import vitcImg from "../assets/images/products/vitc.jpg";
import sheaImg from "../assets/images/products/shea.jpg";
import multivitaminsImg from "../assets/images/products/multivitamins.jpg";
import probioticsImg from "../assets/images/products/probiotics.jpg";
import herbalImg from "../assets/images/products/herbal.jpg";

const allProducts = [
  {
    _id: "1",
    name: "Vitamin C Serum",
    price: 12000,
    image: vitcImg,
    description: "Brightens skin and reduces dark spots."
  },
  {
    _id: "2",
    name: "Shea Butter Cream",
    price: 8000,
    image: sheaImg,
    description: "Deeply moisturizes and softens skin."
  },
  {
    _id: "3",
    name: "Multivitamin Tablets",
    price: 15000,
    image: multivitaminsImg,
    description: "Supports overall health and immunity."
  },
  {
    _id: "4",
    name: "Probiotic Capsules",
    price: 10000,
    image: probioticsImg,
    description: "Promotes gut health and digestion."
  },
  {
    _id: "5",
    name: "Herbal Soap",
    price: 5000,
    image: herbalImg,
    description: "Gentle cleansing with herbal ingredients."
  }
];

export default function Products() {
  const { addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setFilteredProducts(allProducts);
  }, []);

  return (
    <MainLayout>
      <main className="site-main container py-5">
        <h1 className="mb-4 text-center">All Products</h1>

        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div key={product._id} className="col-md-4">
              <div
                className="card h-100 shadow-sm cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: 200, objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="fw-bold">₦{product.price.toLocaleString()}</p>

                  <button
                    className="btn btn-dark mt-auto"
                    onClick={(e) => {
                      e.stopPropagation();
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

        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </main>
    </MainLayout>
  );
}
