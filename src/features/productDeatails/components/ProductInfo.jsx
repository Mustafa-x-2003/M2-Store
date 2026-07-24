import { useState } from "react";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
} from "lucide-react";
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

  /* =========================
      LOADING STATE
  ========================== */

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 xl:gap-14 animate-pulse">
        <div className="h-[380px] sm:h-[480px] lg:h-[620px] rounded-3xl bg-[var(--surface-secondary)]" />

        <div className="flex flex-col justify-center gap-5">
          <div className="h-6 w-32 rounded-lg bg-[var(--surface-secondary)]" />
          <div className="h-12 w-full max-w-xl rounded-xl bg-[var(--surface-secondary)]" />
          <div className="h-5 w-52 rounded-lg bg-[var(--surface-secondary)]" />
          <div className="h-12 w-44 rounded-xl bg-[var(--surface-secondary)]" />
          <div className="h-24 w-full rounded-xl bg-[var(--surface-secondary)]" />
          <div className="h-16 w-full rounded-xl bg-[var(--surface-secondary)]" />
        </div>
      </div>
    );
  }

  /* =========================
      ERROR STATE
  ========================== */

  if (error) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="rounded-2xl border border-[var(--danger-light)] bg-[var(--danger-light)] px-6 py-4 text-center">
          <p className="font-medium text-[var(--danger)]">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) return null;

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
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 xl:gap-14">
      {/* =====================================================
          IMAGE GALLERY
      ====================================================== */}

      <div className="min-w-0">
        {/* Main Image */}
        <div
          className="
            group relative
            flex aspect-square
            min-h-[320px]
            w-full
            items-center justify-center
            overflow-hidden
            rounded-3xl
            border border-[var(--border)]
            bg-[var(--surface)]
            p-6 sm:p-10
            shadow-[var(--shadow)]
             transition-colors duration-300
          "
        >
          {/* Soft Background Decoration */}
          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-64
              w-64
              rounded-full
              bg-[var(--primary-light)]
              blur-3xl
               transition-colors duration-300
            "
          />

          <img
            src={currentImage}
            alt={product.name}
            className="
              relative z-10
              h-full
              w-full
              object-contain
              transition-transform
              duration-500
              ease-out
              group-hover:scale-[1.04]
            "
          />

          {/* Image Counter */}
          {hasMultipleImages && (
            <div
              className="
                absolute
                left-4
                top-4
                z-20
                rounded-full
                border
                border-[var(--border)]
                bg-[var(--surface)]/90
                px-3
                py-1.5
                text-xs
                font-medium
                text-[var(--text-secondary)]
                backdrop-blur-md
                 transition-colors duration-300
              "
            >
              {currentImageIndex + 1} / {images.length}
            </div>
          )}

          {/* Navigation */}
          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={prevImage}
                aria-label="Previous image"
                className="
                  absolute
                  left-4
                  top-1/2
                  z-20
                  -translate-y-1/2
                  rounded-full
                  border
                  border-[var(--border)]
                  bg-[var(--surface)]/90
                  p-2.5
                  text-[var(--text)]
                  opacity-0
                  shadow-sm
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:border-[var(--primary)]
                  hover:bg-[var(--primary)]
                  hover:text-white
                  group-hover:opacity-100
                  focus:opacity-100
                   transition-colors duration-300
                "
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={nextImage}
                aria-label="Next image"
                className="
                  absolute
                  right-4
                  top-1/2
                  z-20
                  -translate-y-1/2
                  rounded-full
                  border
                  border-[var(--border)]
                  bg-[var(--surface)]/90
                  p-2.5
                  text-[var(--text)]
                  opacity-0
                  shadow-sm
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:border-[var(--primary)]
                  hover:bg-[var(--primary)]
                  hover:text-white
                  group-hover:opacity-100
                  focus:opacity-100
                   transition-colors duration-300
                "
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Out Of Stock */}
          {isOutOfStock && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-[var(--overlay)]   transition-colors duration-300">
              <span className="rounded-full bg-[var(--surface)] px-5 py-2.5 text-sm font-bold text-[var(--danger)] shadow-lg  transition-colors duration-300">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {hasMultipleImages && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {images.map((img, index) => (
              <button
                key={img.public_id || index}
                type="button"
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`View image ${index + 1}`}
                className={`
                  relative
                  h-20
                  w-20
                  shrink-0
                  overflow-hidden
                  rounded-2xl
                  border
                  bg-[var(--surface)]
                  p-2
                  transition-all
                  duration-200
                  sm:h-24
                  sm:w-24
                   transition-colors duration-300
                  ${
                    currentImageIndex === index
                      ? "border-2 border-[var(--primary)] shadow-sm  transition-colors duration-300"
                      : "border-[var(--border)] opacity-60 hover:border-[var(--border-hover)] hover:opacity-100  transition-colors duration-300"
                  }
                `}
              >
                <img
                  src={img.url}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="h-full w-full object-contain"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* =====================================================
          PRODUCT INFO
      ====================================================== */}

      <div className="flex min-w-0 flex-col justify-center">
        {/* Tags */}
        <div className="mb-5 flex flex-wrap gap-2">
          {product.tags?.map((tag, index) => (
            <span
              key={index}
              className="
                rounded-full
                border
                border-[var(--border)]
                bg-[var(--surface-secondary)]
                px-3
                py-1
                text-xs
                font-semibold
                text-[var(--text-secondary)]
                 transition-colors duration-300
              "
            >
              {tag}
            </span>
          ))}

          <span
            className="
              rounded-full
              border
              border-[var(--primary-light)]
              bg-[var(--primary-light)]
              px-3
              py-1
              text-xs
              font-semibold
              text-[var(--primary)]
               transition-colors duration-300
            "
          >
            {product.category}
          </span>
        </div>

        {/* Title */}
        <h1
          className="
            max-w-2xl
            text-3xl
            font-bold
            leading-tight
            tracking-tight
            text-[var(--text)]
            sm:text-4xl
            xl:text-5xl
             transition-colors duration-300
          "
        >
          {product.name}
        </h1>

        {/* Rating + Stock */}
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.round(product.averageRating)
                      ? "fill-[var(--warning)] text-[var(--warning)]  transition-colors duration-300"
                      : "fill-[var(--surface-secondary)] text-[var(--border)]  transition-colors duration-300"
                  }`}
                />
              ))}
            </div>

            <span className="text-sm text-[var(--text-secondary)]  transition-colors duration-300">
              {product.averageRating} ({product.numReviews} reviews)
            </span>
          </div>

          <span className="h-4 w-px bg-[var(--border)]  transition-colors duration-300" />

          <span
            className={`
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold
              ${
                isOutOfStock
                  ? "bg-[var(--danger-light)] text-[var(--danger)]  transition-colors duration-300"
                  : "bg-[var(--success-light)] text-[var(--success)]  transition-colors duration-300"
              }
            `}
          >
            {isOutOfStock ? "Out of Stock" : "In Stock"}
          </span>
        </div>

        {/* Price */}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <span className="text-3xl font-bold tracking-tight text-[var(--primary)] sm:text-4xl  transition-colors duration-300">
            EGP {product.discountPrice}
          </span>

          {product.discountPrice < product.price && (
            <>
              <span className="text-lg text-[var(--text-muted)] line-through  transition-colors duration-300">
                EGP {product.price}
              </span>

              <span
                className="
                  rounded-lg
                  bg-[var(--danger-light)]
                  px-2.5
                  py-1
                  text-xs
                  font-bold
                  text-[var(--danger)]
                   transition-colors duration-300
                "
              >
                -{discountPercentage}%
              </span>
            </>
          )}
        </div>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)]  transition-colors duration-300  transition-colors duration-300">
          {product.shortDescription}
        </p>

        {/* Divider */}
        <div className="my-7 h-px bg-[var(--border)]  transition-colors duration-300  transition-colors duration-300" />

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Quantity */}
          <div
            className={`
              flex
              h-14
              items-center
              justify-between
              rounded-2xl
              border
              bg-[var(--surface)]
              p-1
              sm:w-[145px]
              ${
                isOutOfStock
                  ? "border-[var(--border)] opacity-50  transition-colors duration-300"
                  : "border-[var(--input-border)]  transition-colors duration-300"
              }
            `}
          >
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={isOutOfStock}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                text-[var(--text-secondary)]
                transition-colors
                hover:bg-[var(--button-secondary)]
                hover:text-[var(--text)]
                disabled:cursor-not-allowed
                 transition-colors duration-300
              "
            >
              <Minus className="h-4 w-4" />
            </button>

            <span className="font-semibold text-[var(--text)]  transition-colors duration-300">{quantity}</span>

            <button
              type="button"
              onClick={increaseQuantity}
              disabled={isOutOfStock}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                text-[var(--text-secondary)]
                transition-colors
                hover:bg-[var(--button-secondary)]
                hover:text-[var(--text)]
                disabled:cursor-not-allowed
                 transition-colors duration-300
              "
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Add To Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock || addToCartLoading}
            className={`
              flex
              h-14
              flex-1
              items-center
              justify-center
              gap-3
              rounded-2xl
              px-6
              font-semibold
              transition-all
              duration-200
              ${
                isOutOfStock
                  ? "cursor-not-allowed bg-[var(--button-secondary)] text-[var(--text-muted)]  transition-colors duration-300"
                  : "bg-[var(--primary)] text-white shadow-lg shadow-blue-500/20 hover:bg-[var(--primary-hover)] active:scale-[0.98]  transition-colors duration-300"
              }
            `}
          >
            {addToCartLoading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <ShoppingCart className="h-5 w-5" />
            )}

            <span>
              {isOutOfStock
                ? "Out of Stock"
                : addToCartLoading
                  ? "Adding..."
                  : "Add to Cart"}
            </span>
          </button>

          {/* Wishlist */}
          <button
            type="button"
            onClick={() => toggleWishlist(product._id)}
            disabled={wishlistLoading}
            aria-label="Add to wishlist"
            className={`
              flex
              h-14
              w-full
              items-center
              justify-center
              rounded-2xl
              border
              transition-all
              duration-200
              sm:w-14
              ${
                isInWishlist
                  ? "border-[var(--danger)] bg-[var(--danger-light)] text-[var(--danger)]  transition-colors duration-300"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--danger)] hover:bg-[var(--danger-light)] hover:text-[var(--danger)]  transition-colors duration-300"
              }
            `}
          >
            <Heart
              className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`}
            />
          </button>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] p-4  transition-colors duration-300">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]  transition-colors duration-300">
              <Truck className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--text)]  transition-colors duration-300">
                Fast Delivery
              </p>
              <p className="text-xs text-[var(--text-secondary)]  transition-colors duration-300">
                Quick and secure shipping
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] p-4  transition-colors duration-300">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--success-light)] text-[var(--success)]  transition-colors duration-300">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--text)]  transition-colors duration-300">
                Secure Purchase
              </p>
              <p className="text-xs text-[var(--text-secondary)]  transition-colors duration-300">
                Safe and trusted checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
