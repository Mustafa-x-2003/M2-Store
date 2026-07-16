import { useState, useEffect, useCallback } from "react";
import { getAllProducts } from "../servecies/ProductsAPi";
function useProducts() {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)
    const getProducts = useCallback(
        async (signal) => {
            try {
                setLoading(true)
                setError(null)
                const response = await getAllProducts(signal)
                setProducts(Array.isArray(response?.data?.products) ? response.data.products : []);
            } catch (err) {
               if (err?.code === "ERR_CANCELED" || err?.name === "AbortError") return;
               setError(err);
            }finally{
                if (!signal?.aborted) setLoading(false);
            }
        }
        ,[])
    useEffect(
        ()=>{
            const controller = new AbortController() ;
            getProducts(controller.signal)
            return ()=>controller.abort()
        },[getProducts])
        return {loading ,products ,error , getProducts}
}
export default useProducts