import api from "./api";

// 🔹 Remove /api from base URL for images
const backendURL =
  import.meta.env.VITE_API_URL?.replace("/api", "") ||
  "http://localhost:5000";

export const getProducts = async () => {
  const { data } = await api.get("/products");

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
