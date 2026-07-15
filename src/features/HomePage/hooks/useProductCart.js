import { useState, useCallback } from "react";
import { addProductToCart } from "../servecies/ProductsAPi";

function useProductCart(){
    const [loading ,setLoading] = useState(false)
    const [error , setError] = useState(null)
    const addProduct = useCallback(
        async ({productId,quantity}) => {
            try {
                setLoading(true)
                setError(null)
                const response = await addProductToCart({productId,quantity})
                return response
            } catch (error) {
                setError(error)
            }finally{
                setLoading(false)
            }
        }
        ,[])
    return {loading ,error , addProduct}
}
export default useProductCart