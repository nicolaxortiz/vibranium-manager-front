import api from "../services/api";

const API_BASE_URL = import.meta.env.VITE_API_URL + "customers";

export const searchCustomers = async (query) => {
  try {
    const response = await api.get(`${API_BASE_URL}/search`, {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error("Error searching customers:", error.message);
    throw error;
  }
};

export const createCustomer = async (customerData) => {
  try {
    const response = await api.post(`${API_BASE_URL}`, customerData);
    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error.message);
    throw error;
  }
};

export const updateCustomer = async (customerId, customerData) => {
  try {
    const response = await api.put(
      `${API_BASE_URL}/${customerId}`,
      customerData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating customer:", error.message);
    throw error;
  }
};

export const deleteCustomer = async (customerId) => {
  try {
    const response = await api.delete(`${API_BASE_URL}/${customerId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting customer:", error.message);
    throw error;
  }
};
