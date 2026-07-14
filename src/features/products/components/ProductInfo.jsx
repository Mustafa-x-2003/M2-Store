import { useState } from "react";
import { Star, Minus, Plus, ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useProduct } from "../context/ProductContext";

export default function ProductInfo() {
  const {
    product,
    loading,
    error,
    quantity,
    increaseQuantity,
    decreaseQuantity,
    isOutOfStock,
    discountPercentage,
    isInWishlist,
    wishlistLoading,
    toggleWishlist,
    handleAddToCart,
    addToCartLoading,
  } = useProduct();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ── Loading skeleton ──
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 animate-pulse">
        <div className="h-[350px] sm:h-[400px] lg:h-[550px] rounded-[2rem] bg-slate-200 dark:bg-slate-800" />
        <div className="flex flex-col justify-center gap-6">
          <div className="h-6 w-32 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-12 w-3/4 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-5 w-48 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-10 w-40 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-20 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-14 w-full rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    );
  }

  // ── Error state ──
  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-rose-500 font-medium">{error}</p>
      </div>
    );
  }

  // ── No product found ──
  if (!product) return null;

  // Pick the current image or use a fallback
  const images = product.images || [];
  const currentImage = images[currentImageIndex]?.url || "";
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

      {/* Image Gallery */}
      <div className="flex flex-col gap-4">
        <div className="relative h-[350px] sm:h-[400px] lg:h-[550px] w-full rounded-[2rem] overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800/50 flex items-center justify-center p-6 sm:p-10 border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none group">
          <div className="absolute inset-0 bg-white/40 dark:bg-black/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 rounded-[2rem]" />
          <img
            alt={product.name}
            className="w-full h-full object-contain relative z-20 group-hover:scale-105 transition-transform duration-700 ease-out drop-shadow-2xl"
            src={currentImage}
          />

          {/* Navigation Buttons */}
          {hasMultipleImages && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 z-30 p-2 sm:p-3 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-white backdrop-blur-md border border-white/50 dark:border-slate-700/50 shadow-lg hover:bg-white dark:hover:bg-slate-800 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 z-30 p-2 sm:p-3 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-white backdrop-blur-md border border-white/50 dark:border-slate-700/50 shadow-lg hover:bg-white dark:hover:bg-slate-800 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </>
          )}

          {/* Out-of-stock overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 z-30 flex items-center justify-center rounded-[2rem]">
              <span className="text-white text-2xl font-bold tracking-wide">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {hasMultipleImages && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((img, idx) => (
              <button
                key={img.public_id || idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 ${
                  currentImageIndex === idx
                    ? "border-indigo-600 dark:border-indigo-400 opacity-100"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={img.url}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  className="w-full h-full object-contain p-2"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-center">

        {/* Tags & Title */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags?.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                {tag}
              </span>
            ))}
            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/50">
              {product.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
            {product.name}
          </h1>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(product.averageRating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-slate-200 dark:fill-slate-700 text-slate-200 dark:text-slate-700"
                }`}
              />
            ))}
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-2">
              ({product.numReviews} Reviews)
            </span>
          </div>
          <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
          <span
            className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${
              isOutOfStock
                ? "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400"
                : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
            }`}
          >
            {isOutOfStock ? "Out of Stock" : "In Stock"}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-end gap-4 mb-8">
          <span className="text-4xl sm:text-5xl font-extrabold text-[#1e58b6] dark:text-[#1e58b6] tracking-tight">
            EGP&nbsp;{product.discountPrice}
          </span>
          {product.discountPrice < product.price && (
            <>
              <span className="text-xl sm:text-2xl text-slate-400 dark:text-slate-500 line-through mb-1">
                EGP&nbsp;{product.price}
              </span>
              <span className="inline-flex items-center px-2.5 py-1 text-sm font-bold rounded-lg bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 mb-2">
                -{discountPercentage}%
              </span>
            </>
          )}
        </div>

        {/* Description Preview */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
          {product.shortDescription}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">

          {/* Quantity Selector */}
          <div className={`flex items-center justify-between sm:justify-start p-1 border-2 rounded-2xl ${isOutOfStock ? "opacity-50 pointer-events-none border-slate-200 dark:border-slate-800" : "border-slate-200 dark:border-slate-800"} bg-white dark:bg-slate-950`}>
            <button
              onClick={decreaseQuantity}
              disabled={isOutOfStock}
              className="p-3 sm:p-4 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="w-12 text-center text-lg font-bold">{quantity}</span>
            <button
              onClick={increaseQuantity}
              disabled={isOutOfStock}
              className="p-3 sm:p-4 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || addToCartLoading}
            className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 sm:py-0 rounded-2xl font-bold text-lg transition-all cursor-pointer disabled:cursor-not-allowed ${
              isOutOfStock
                ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                : "bg-[#1e58b6] text-white hover:bg-[#1a4fa0] shadow-[0_8px_30px_rgb(30,88,182,0.35)] hover:shadow-none hover:scale-[0.98]"
            }`}
          >
            {addToCartLoading ? (
              <span className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <ShoppingCart className="w-6 h-6" />
            )}
            {isOutOfStock ? "Out of Stock" : addToCartLoading ? "Adding..." : "Add to Cart"}
          </button>

          {/* Wishlist */}
          <button
            onClick={() => toggleWishlist(product._id)}
            disabled={wishlistLoading}
            className={`p-3 sm:p-0 sm:w-11 sm:h-11 flex items-center self-center justify-center border-2 rounded-xl transition-all group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
              isInWishlist
                ? "border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-500"
                : "border-slate-200 dark:border-slate-800 hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-400 hover:text-rose-500"
            }`}
          >
            <Heart className={`w-[18px] h-[18px] transition-colors ${isInWishlist ? "fill-rose-500" : "group-hover:fill-rose-500"}`} />
          </button>
        </div>
      </div>
    </div>
  );
}