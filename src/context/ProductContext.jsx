import { createContext, useContext, useState, useEffect } from "react";
import { getProducts } from "../services/productService";

// ✅ Local fallback images
import featuredVitc from "../assets/images/products/featured/vitc.jpg";
import featuredShea from "../assets/images/products/featured/shea.jpg";
import featuredMultivitamins from "../assets/images/products/featured/multivitamins.jpg";
import featuredProbiotics from "../assets/images/products/featured/probiotics.jpg";
import featuredHerbal from "../assets/images/products/featured/herbal.jpg";

import hotdealVitc from "../assets/images/products/hotdeals/vitc.jpg";
import hotdealShea from "../assets/images/products/hotdeals/shea.jpg";
import hotdealMultivitamins from "../assets/images/products/hotdeals/multivitamins.jpg";
import hotdealProbiotics from "../assets/images/products/hotdeals/probiotics.jpg";
import hotdealHerbal from "../assets/images/products/hotdeals/herbal.jpg";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        // Normalize products
        const normalized = data.map((p, idx) => {
          const name = (p.name || "").toLowerCase();

          // ✅ Assign featured fallback images
          let featuredImage = featuredVitc; // default
          if (name.includes("vitamin c")) featuredImage = featuredVitc;
          if (name.includes("shea")) featuredImage = featuredShea;
          if (name.includes("multivitamin")) featuredImage = featuredMultivitamins;
          if (name.includes("probiotic")) featuredImage = featuredProbiotics;
          if (name.includes("herbal")) featuredImage = featuredHerbal;

          // ✅ Assign hotdeal fallback images
          let hotdealImage = hotdealVitc; // default
          if (name.includes("vitamin c")) hotdealImage = hotdealVitc;
          if (name.includes("shea")) hotdealImage = hotdealShea;
          if (name.includes("multivitamin")) hotdealImage = hotdealMultivitamins;
          if (name.includes("probiotic")) hotdealImage = hotdealProbiotics;
          if (name.includes("herbal")) hotdealImage = hotdealHerbal;

          // TEMP: assign featured / hotdeal flags for dev
          const isFeatured = idx % 2 === 0; // every even product
          const isHotDeal = idx % 3 === 0;  // every third product

          return {
            ...p,
            _id: p._id || p.id || `local-${idx}`,
            image: p.image || featuredImage, // fallback for featured section
            featuredFallback: featuredImage,
            hotdealFallback: hotdealImage,
            isFeatured,
            isHotDeal,
          };
        });

        setProducts(normalized);
      } catch (err) {
        console.warn("Backend not connected yet", err);
        // 🔹 Optional: fallback to local products here if backend fails
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
