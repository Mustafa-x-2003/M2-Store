import { FaHeart } from "react-icons/fa";

export default function WishlistButton({
    productId,
    isInWishlist,
    onToggleWishlist,
}) {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(productId);
            }}
            className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${isInWishlist
                    ? "bg-rose-50 text-rose-500"
                    : "bg-white/80 text-gray-400 hover:text-rose-500"
                }`}
        >
            <FaHeart
                className={isInWishlist ? "fill-rose-500" : ""}
            />
        </button>
    );
}