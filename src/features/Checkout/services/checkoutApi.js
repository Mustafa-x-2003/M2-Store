import axiosInstance from "./axios";
import { ENDPOINTS } from "./endpoints";

export const createOrder = async (orderData) => {
    return await axiosInstance.post(
        ENDPOINTS.ORDERS.PLACE,
        orderData
    );
};