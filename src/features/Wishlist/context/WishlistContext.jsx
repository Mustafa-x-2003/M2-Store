import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
    getMyWishlist,
    addToWishlist,
    removeFromWishlist,
} from "../../productDeatails/service/productService";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const { user } = useAuth();

    const [wishlistProductIds, setWishlistProductIds] = useState([]);
    const [wishlistLoading, setWishlistLoading] = useState(false);

    // ================= Fetch Wishlist =================
    const fetchWishlist = async () => {
        if (!user) {
            setWishlistProductIds([]);
            return;
        }

        try {
            const data = await getMyWishlist();

            const products = data.wishlist?.products || data.products || [];

            const ids = products.map(
                (item) => item._id || item.product?._id || item
            );

            setWishlistProductIds(ids);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, [user]);

    // ================= Toggle =================
    const toggleWishlist = async (productId) => {
        if (!user) {
            toast.error("Please login first");
            return;
        }

        setWishlistLoading(true);

        try {
            if (wishlistProductIds.includes(productId)) {
                await removeFromWishlist(productId);

                setWishlistProductIds((prev) =>
                    prev.filter((id) => id !== productId)
                );

                toast.success("Removed from wishlist");
            } else {
                await addToWishlist(productId);

                setWishlistProductIds((prev) => [...prev, productId]);

                toast.success("Added to wishlist");
            }

            window.dispatchEvent(new Event("navbar-counts-update"));
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Failed to update wishlist"
            );
        } finally {
            setWishlistLoading(false);
        }
    };

    // ================= Remove Locally =================
    const removeWishlistLocally = (productId) => {
        setWishlistProductIds((prev) =>
            prev.filter((id) => id !== productId)
        );
    };

    // ================= Clear Locally =================
    const clearWishlistLocally = () => {
        setWishlistProductIds([]);
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlistProductIds,
                wishlistLoading,
                toggleWishlist,
                fetchWishlist,
                removeWishlistLocally,
                clearWishlistLocally,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export const useWishlist = () => useContext(WishlistContext);