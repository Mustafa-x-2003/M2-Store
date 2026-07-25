import axiosInstance from "../../../services/api/interceptors";


export const getCart = () => {
  return axiosInstance.get("/carts");
};

export const addToCart = (productId, quantity = 1) => {
  return axiosInstance.post("/carts/items", {
    productId,
    quantity,
  });
};

export const updateQuantity = (productId, quantity) => {
  return axiosInstance.patch("/carts/items", {
    productId,
    quantity,
  });
};

export const deleteItem = (productId) => {
  return axiosInstance.delete(`/carts/items/${productId}`);
};

export const updateCoupon = (coupon) => {
  return axiosInstance.post("/carts/coupon", {
    code: coupon,
  });
};

export const removeCoupon = () => {
  return axiosInstance.delete("/carts/coupon");
};

export const clearCart = () => {
  return axiosInstance.delete("/carts/clear");
};