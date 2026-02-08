// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("cart"));
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  // Persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Auto-hide toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Add to cart
  const addToCart = (product) => {
    const id = product._id || product.name;

    setCart((prev) => {
      const exist = prev.find(
        (item) => (item._id || item.name) === id
      );

      if (exist) {
        return prev.map((item) =>
          (item._id || item.name) === id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          qty: 1,
          cartImage: product.image, // lock image forever
        },
      ];
    });

    setToast(`${product.name} added to cart 🛒`);
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        (item._id || item.name) === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          (item._id || item.name) === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((item) => (item._id || item.name) !== id)
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        total,
        count,
        toast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
