import api from "../services/api";

const API_BASE_URL = import.meta.env.VITE_API_URL + "dashboard";

export const getDashboardStats = async (year) => {
  try {
    const response = await api.get(`${API_BASE_URL}/stats`, {
      params: { year },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching stats:", error.message);
    throw error;
  }
};
