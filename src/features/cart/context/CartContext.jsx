import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useAuth } from "../../../context/AuthContext";
import {
    getCart,
    addToCart as addToCartApi,
} from "../services/cartApi";;
import toast from "react-hot-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
    const { user } = useAuth();

    const [cart, setCart] = useState(null);
    const [cartLoading, setCartLoading] = useState([]);
    // ================= Fetch Cart =================
    const fetchCart = async () => {
        if (!user) {
            setCart(null);
            return;
        }

        try {
            const res = await getCart();
            setCart(res.data);
        } catch (err) {
            console.error("Failed to fetch cart:", err);
            setCart(null);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [user]);

    // ================= Add To Cart =================
    const addToCart = async (productId, quantity = 1) => {
        if (!user) {
            toast.error("Please login first");
            return;
        }

        setCartLoading((prev) => [...prev, productId]);

        try {
            await addToCartApi(productId, quantity);

            await fetchCart();


            toast.success("Added to cart successfully!");
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Failed to add product to cart."
            );
        } finally {
            setCartLoading((prev) =>
                prev.filter((id) => id !== productId)
            );
        }
    };

    // ================= Product Ids =================
    const cartProductIds = useMemo(() => {
        return cart?.items?.map((item) => item.product) || [];
    }, [cart]);

    return (
        <CartContext.Provider
            value={{
                cart,
                cartLoading,
                cartProductIds,
                fetchCart,
                addToCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);