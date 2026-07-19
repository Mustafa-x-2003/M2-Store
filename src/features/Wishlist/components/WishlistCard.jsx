import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiShoppingCart } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

const WishlistCard = ({
  product,
  onAddToCart,
  onRemovefromWishlist,
}) => {
  const navigate = useNavigate();

  const [loadingCart, setLoadingCart] = useState(false);
  const [added, setAdded] = useState(false);

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = async () => {
    if (isOutOfStock) return;

    try {
      setLoadingCart(true);

      const res = await onAddToCart(product._id);

      if (res !== false) {
        setAdded(true);
        toast.success("Added to cart");
      }
    } catch (error) {
      toast.error("Failed to add product");
    } finally {
      setLoadingCart(false);
    }
  };

  return (
    <div className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] dark:border-gray-700 dark:bg-gray-800 flex flex-col justify-between overflow-hidden">

      <div
        className="overflow-hidden cursor-pointer"
        onClick={() => navigate(`/products/${product._id}`)}
      >
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="h-72 w-full object-cover transition-all duration-500 hover:scale-105"
        />
      </div>

      <div className="mb-3 flex flex-col gap-3 p-4">

        <p
          onClick={() => navigate(`/products/${product._id}`)}
          className="line-clamp-2 cursor-pointer text-sm font-medium text-[var(--text)] hover:text-[var(--primary)]"
        >
          {product.name}
        </p>

        <div className="flex items-center gap-4">
          <h4 className="text-xl font-bold text-[var(--primary)]">
            EGP {Number(product.discountPrice).toLocaleString("en-US")}
          </h4>

          {!!product.discountPrice && (
            <span className="text-[var(--text-muted)]">
              <del>
                EGP {Number(product.discountPrice).toLocaleString("en-US")}
              </del>
            </span>
          )}
        </div>

        <div className="flex w-full items-center gap-2">

          <button
            onClick={handleAddToCart}
            disabled={loadingCart || isOutOfStock}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition-all duration-200 active:scale-95
              ${
                isOutOfStock
                  ? "cursor-not-allowed bg-[var(--surface-secondary)] text-[var(--text-muted)]"
                  : added
                  ? "border border-[var(--danger)] bg-[var(--danger-light)] text-[var(--danger)]"
                  : "bg-[var(--primary)] text-[var(--text-inverse)] hover:bg-[var(--primary-hover)]"
              }`}
          >
            {loadingCart ? (
              <AiOutlineLoading3Quarters className="animate-spin text-lg" />
            ) : (
              <>
                {!isOutOfStock && <HiShoppingCart className="text-lg" />}

                <span>
                  {isOutOfStock
                    ? "Out of Stock"
                    : added
                    ? "Added to Cart"
                    : "Add to Cart"}
                </span>
              </>
            )}
          </button>

          <button
            onClick={() => onRemovefromWishlist(product._id)}
            className="flex items-center justify-center rounded-lg bg-[var(--danger-light)] px-2 py-2 text-[var(--danger)] transition-colors hover:bg-[var(--danger)] hover:text-[var(--text-inverse)]"
          >
            <RiDeleteBin6Line />
          </button>

        </div>
      </div>
    </div>
  );
};

export default WishlistCard;