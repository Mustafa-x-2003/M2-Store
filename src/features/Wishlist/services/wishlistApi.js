import axiosInstance from "../../../services/api/axios"

export const getWishlist = ()=>{
        return axiosInstance.get("/wishlists/my")
}






export const removeFromWishlist = (productId) => {
        return axiosInstance.delete(`/wishlists/remove/${productId}`)
        
}

export const clearWishlist = () => {
        return axiosInstance.delete("/wishlists/clear")

}