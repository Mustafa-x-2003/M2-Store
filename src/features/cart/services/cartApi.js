import axiosInstance from "../../../services/api/interceptors";
export const getCart = () => {
  return axiosInstance.get("/carts");
};
export const updateQuantity = (productId, quantity) => {
  return axiosInstance.patch("/carts/items", {
    productId,
    quantity,
  });
};
export const deleteitem= (productId) => {
  return axiosInstance.delete(`/carts/items/${productId}`)
};
export const updatecoupon=(coupon)=>{
    return axiosInstance.post("/carts/coupon", {
    code: coupon,
  });
}
export const removeCoupon=(coupon)=>{
    return axiosInstance.delete("/carts/coupon")
  }