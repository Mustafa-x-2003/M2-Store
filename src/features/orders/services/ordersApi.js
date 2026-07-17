import axiosInstance from "../../../services/api/axios";
export const getorders= () => {
  return axiosInstance.get(`/orders/my`);
};