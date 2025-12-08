import api from "../services/api";

const API_BASE_URL = import.meta.env.VITE_API_URL + "users";

export const signIn = async (userData) => {
  try {
    const response = await api.post(`${API_BASE_URL}/signin`, userData);
    return response.data;
  } catch (error) {
    console.error("Error searching user:", error.message);
    throw error;
  }
};

export const validateLogin = async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error validated user:", error.message);
    throw error;
  }
};
