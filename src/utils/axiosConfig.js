// axiosConfig.js
import axios from "axios";
import axiosRetry from "axios-retry";

// Create an Axios instance (you can set baseURL here)
const axiosInstance = axios.create({
  baseURL: "https://vendor.rierco.net/api/server/", // Replace with your base URL
  // baseURL: "http://localhost:3004/server/", // Replace with your base URL
});

// Apply axios-retry globally to this instance
axiosRetry(axiosInstance, { retries: 3 }); // Retries failed requests up to 3 times

export default axiosInstance;
