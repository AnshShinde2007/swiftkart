import axios from "axios";

const API_URL = "http://localhost:5173/api/user"; // Adjust port if needed

// Fetch all user
export const getUser = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching user", error);
    return [];
  }
};

// Create a new user
export const createProduct = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user", error);
    return null;
  }
};
