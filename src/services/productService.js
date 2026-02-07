import api from "./api"; // your axios instance
const backendURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getProducts = async () => {
  const { data } = await api.get("/products");

  // Ensure every product has _id and absolute image URL
  return data.map((p, idx) => ({
    ...p,
    _id: p._id || p.id || `local-${idx}`,
    image: p.image ? `${backendURL}${p.image}` : null,
  }));
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return {
    ...data,
    _id: data._id || data.id || "local-id",
    image: data.image ? `${backendURL}${data.image}` : null,
  };
};
