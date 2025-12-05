import api from "../services/api";

const API_BASE_URL = import.meta.env.VITE_API_URL + "products";

export const searchProducts = async (query) => {
  try {
    const response = await api.get(`${API_BASE_URL}/search`, {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error("Error searching products:", error.message);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post(`${API_BASE_URL}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error.message);
    throw error;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await api.put(`${API_BASE_URL}/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error.message);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`${API_BASE_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error.message);
    throw error;
  }
};
