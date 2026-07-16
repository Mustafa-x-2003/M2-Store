import axiosInstance from "../../../services/api/axios";
import { ENDPOINTS } from "../../../services/endpoints";

export const createOrder = async (orderData) => {
    return await axiosInstance.post(
        ENDPOINTS.ORDERS.PLACE,
        orderData
    );
};