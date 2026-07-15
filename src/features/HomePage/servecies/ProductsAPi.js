import axiosInstance from "../../../services/api/interceptors";
import { ENDPOINTS } from "../../../services/endpoints";

const { PRODUCTS } = ENDPOINTS;

export const getAllProducts    = (signal)          => axiosInstance.get(PRODUCTS.BASE, { signal });
export const getProductById   = (id)              => axiosInstance.get(PRODUCTS.BY_ID(id));
export const searchProducts   = (params, signal)  => axiosInstance.get(PRODUCTS.SEARCH, { params, signal });
export const createProduct    = (data)            => axiosInstance.post(PRODUCTS.BASE, data);
export const updateProduct    = (id, data)        => axiosInstance.patch(PRODUCTS.UPDATE(id), data);
export const deleteProduct    = (id)              => axiosInstance.delete(PRODUCTS.BY_ID(id));