import React from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router";
const EmptyWishlist = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <Heart size={70} className="mb-5 text-gray-300 dark:text-gray-600" />
        <h2 className="text-3xl font-bold text-[var(--text)] dark:text-white">
          Your wishlist is empty
        </h2>

        <p className="mt-3 max-w-md text-[var(--text-secondary)] dark:text-gray-400">
          Save items you love to your wishlist. They'll be waiting for you here.
        </p>

        <button
          onClick={() => navigate("/products")}
          className="mt-8 rounded-lg bg-[var(--primary)] text-[var(--text-inverse)] px-6 py-3 font-medium text-white transition hover:bg-blue-800"
        >
          Browse Products
        </button>
      </div>
    </>
  );
};

export default EmptyWishlist;
