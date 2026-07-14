import axios from "axios";
import axiosInstance from "./axios";

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (axios.isCancel(error) || error?.code === "ERR_CANCELED") {
      return Promise.reject(error);
    }

    const status  = error.response?.status;
    const payload = error.response?.data;

    if (status) {
      console.error(
        `[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url} → ${status}`,
        payload ?? "(no body)"
      );
      error.message = `Request failed: ${status} ${error.response?.statusText ?? ""}`.trim();
    } else {
      console.error(
        `[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url} → No response (${error.code ?? "ERR_NETWORK"})`,
        error.message
      );
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
