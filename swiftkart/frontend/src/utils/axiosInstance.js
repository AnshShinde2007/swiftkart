import axios from "axios";

// Use environment variable for base URL
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default axiosInstance;
