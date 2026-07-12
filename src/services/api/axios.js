import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "/api";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
  withCredentials: false,
});

export default axiosInstance;

