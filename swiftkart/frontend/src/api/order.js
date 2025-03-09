import axios from "axios";

const API_URL = "http://localhost:5173/api/order"; // Adjust port if needed

// Fetch all products
export const getOrder = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching the order", error);
    return [];
  }
};

// Create a new product
export const createOrder = async (OrderData) => {
  try {
    const response = await axios.post(API_URL, OrderData);
    return response.data;
  } catch (error) {
    console.error("Error placing order", error);
    return null;
  }
};
