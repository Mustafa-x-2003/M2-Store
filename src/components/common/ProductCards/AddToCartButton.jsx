import { HiShoppingCart } from "react-icons/hi";

export default function AddToCartButton({
    productId,
    outOfStock = false,
    loading = false,
    added = false,
    onAdd,
}) {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();

                if (outOfStock || loading) return;

                onAdd(productId);
            }}
            disabled={loading || outOfStock}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200
        ${outOfStock
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : added
                        ? "bg-red-50 text-red-500 border border-red-200"
                        : "bg-blue-800 text-white hover:bg-blue-700"
                }
      `}
        >
            <HiShoppingCart className="text-base" />

            {outOfStock
                ? "Out of Stock"
                : loading
                    ? "Adding..."
                    : added
                        ? "Added to Cart"
                        : "Add to Cart"}
        </button>
    );
}