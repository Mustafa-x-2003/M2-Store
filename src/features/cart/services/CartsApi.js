import axiosInstance from "../../../services/api/axios"

export const addToCart = (productId, quantity = 1) => {
    return axiosInstance.post("/carts/items", {
        productId,
        quantity,
    });
};