import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL + "orders";

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error.message);
    throw error;
  }
};

export const updateOrder = async (orderId, orderData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${orderId}`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error updating order:", error.message);
    throw error;
  }
};

export const downloadOrderPDF = async (orderId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/download/${orderId}`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.error("Error downloading order PDF:", error.message);
    throw error;
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order by ID:", error.message);
    throw error;
  }
};

export const searchOrders = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error("Error searching orders:", error.message);
    throw error;
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting order:", error.message);
    throw error;
  }
};
