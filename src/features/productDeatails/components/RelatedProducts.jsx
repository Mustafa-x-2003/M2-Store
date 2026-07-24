import { Sparkles } from "lucide-react";
import { useProduct } from "../context/ProductContext";
import ProductCard from "../../../components/common/ProductCards/ProductCard";

export default function RelatedProducts() {
  const {
    relatedProducts,
    relatedLoading,
    handleAddRelatedToCart,
    addingRelatedCartId,
  } = useProduct();

  // Don't render the section if there are no related products
  if (!relatedLoading && relatedProducts.length === 0) return null;

  return (
    <section
      className="
        mt-20
        border-t
        border-[var(--border)]
        pt-16
        transition-colors
        duration-300
        lg:mt-32
        lg:pt-24
      "
    >
      {/* =========================
          SECTION HEADER
      ========================== */}

      <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
        <div>
          {/* Label */}
          <div className="mb-3 flex items-center gap-2">
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-[var(--primary-light)]
                text-[var(--primary)]
                transition-colors
                duration-300
              "
            >
              <Sparkles className="h-4 w-4" />
            </div>

            <span
              className="
                text-sm
                font-semibold
                text-[var(--primary)]
                transition-colors
                duration-300
              "
            >
              Recommended For You
            </span>
          </div>

          {/* Title */}
          <h2
            className="
              text-2xl
              font-bold
              tracking-tight
              text-[var(--text)]
              transition-colors
              duration-300
              sm:text-3xl
              lg:text-4xl
            "
          >
            You May Also Like
          </h2>

          {/* Description */}
          <p
            className="
              mt-2
              text-sm
              text-[var(--text-secondary)]
              transition-colors
              duration-300
              sm:text-base
            "
          >
            Discover more products you might love
          </p>
        </div>
      </div>

      {/* =========================
          LOADING SKELETON
      ========================== */}

      {relatedLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <RelatedProductSkeleton key={item} />
          ))}
        </div>
      ) : (
        /* =========================
            RELATED PRODUCTS
        ========================== */

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((item) => (
            <ProductCard
              key={item._id}
              product={item}
              onAddToCart={handleAddRelatedToCart}
              loading={addingRelatedCartId === item._id}
            />
          ))}
        </div>
      )}
    </section>
  );
}

/* =====================================================
   RELATED PRODUCT SKELETON
===================================================== */

function RelatedProductSkeleton() {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-[var(--border)]
        bg-[var(--surface)]
        shadow-[var(--shadow)]
        transition-colors
        duration-300
      "
    >
      {/* Image */}
      <div
        className="
          aspect-[4/4.5]
          animate-pulse
          bg-[var(--surface-secondary)]
          transition-colors
          duration-300
        "
      />

      {/* Content */}
      <div className="space-y-4 p-5">
        {/* Category */}
        <div
          className="
            h-3
            w-20
            animate-pulse
            rounded-full
            bg-[var(--surface-secondary)]
            transition-colors
            duration-300
          "
        />

        {/* Title */}
        <div
          className="
            h-5
            w-3/4
            animate-pulse
            rounded-lg
            bg-[var(--surface-secondary)]
            transition-colors
            duration-300
          "
        />

        {/* Price */}
        <div
          className="
            h-5
            w-1/2
            animate-pulse
            rounded-lg
            bg-[var(--surface-secondary)]
            transition-colors
            duration-300
          "
        />

        {/* Button */}
        <div
          className="
            h-11
            w-full
            animate-pulse
            rounded-xl
            bg-[var(--surface-secondary)]
            transition-colors
            duration-300
          "
        />
      </div>
    </div>
  );
}