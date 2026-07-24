import { useState, useCallback } from "react";
import { addProductToCart } from "../servecies/ProductsAPi";
import toast from "react-hot-toast";
function useProductCart(){
    const [loading ,setLoading] = useState(false)
    const [error , setError] = useState(null)
    const addProduct = useCallback(async ({ productId, quantity }) => {
        try {
            setLoading(true);
            setError(null);

            const response = await addProductToCart({
                productId,
                quantity,
            });

            window.dispatchEvent(new Event("navbar-counts-update"));

            toast.success("Added to cart successfully!");

            return response;
        } catch (error) {
            setError(error);

            toast.error(
                error.response?.data?.message || "Failed to add product to cart."
            );
        } finally {
            setLoading(false);
        }
    }, []);
    return {loading ,error , addProduct}
}
export default useProductCart