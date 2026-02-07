import { createContext, useContext, useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import fallbackImg from "../assets/images/products/vitc.jpg";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        const normalized = data.map((p, idx) => ({
          ...p,
          _id: p._id || p.id || `local-${idx}`,
          // ✅ DO NOT re-prefix backend images
          image: p.image
        }));

        setProducts(normalized);
      } catch (err) {
        console.warn("Backend not connected yet", err);
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
