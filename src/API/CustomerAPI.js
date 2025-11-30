import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL + "customers";

export const searchCustomers = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
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
    const response = await axios.post(`${API_BASE_URL}`, customerData);
    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error.message);
    throw error;
  }
};

export const updateCustomer = async (customerId, customerData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${customerId}`,
      customerData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating customer:", error.message);
    throw error;
  }
};
