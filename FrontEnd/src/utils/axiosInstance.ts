import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Set your base URL here
});

// Add a request interceptor to include the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
