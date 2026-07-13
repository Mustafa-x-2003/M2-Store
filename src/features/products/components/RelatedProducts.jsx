import { useNavigate } from "react-router";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useProduct } from "../context/ProductContext";

export default function RelatedProducts() {
  const { 
    relatedProducts, 
    relatedLoading, 
    wishlistProductIds = [], 
    toggleWishlist,
    handleAddRelatedToCart,
    addingRelatedCartId
  } = useProduct();
  
  const navigate = useNavigate();

  // Don't render the section if there are no related products
  if (!relatedLoading && relatedProducts.length === 0) return null;

  return (
    <section className="mt-20 lg:mt-32">
      <div className="flex items-center justify-between mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          You May Also Like
        </h2>
      </div>

      {/* Loading skeleton */}
      {relatedLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse rounded-[2rem] overflow-hidden">
              <div className="aspect-[4.5/5] bg-slate-200 dark:bg-slate-800 rounded-[2rem]" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {relatedProducts.map((item) => {
            const outOfStock = item.stock <= 0;
            const discount =
              item.price > 0
                ? Math.round(((item.price - item.discountPrice) / item.price) * 100)
                : 0;
            const isInWishlist = wishlistProductIds.includes(item._id);

            return (
              <div
                key={item._id}
                onClick={() => navigate(`/products/${item._id}`)}
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl dark:hover:shadow-indigo-900/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[4.5/5] overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-[2rem] rounded-b-none">
                  <img
                    alt={item.name}
                    className="w-full h-full object-contain p-4 sm:p-6 group-hover:scale-105 transition-transform duration-300"
                    src={item.images?.[0]?.url || ""}
                  />

                  {/* Category badge */}
                  <span className="inline-flex items-center px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 absolute top-4 left-4 backdrop-blur-md shadow-sm border border-slate-200/50 dark:border-slate-700/50 z-10">
                    {item.category}
                  </span>

                  {/* Discount badge */}
                  {discount > 0 && (
                    <span className="inline-flex items-center px-3 py-1 text-[10px] sm:text-xs font-bold rounded-full bg-rose-100 dark:bg-rose-900/80 text-rose-700 dark:text-rose-400 absolute top-4 right-16 backdrop-blur-md shadow-sm z-10 border border-rose-200/50 dark:border-rose-800/50">
                      -{discount}%
                    </span>
                  )}

                  {/* Wishlist button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(item._id);
                    }}
                    className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all backdrop-blur-md shadow-sm z-10 group/btn border cursor-pointer ${
                      isInWishlist
                        ? "bg-rose-50 border-rose-200 dark:bg-rose-900/30 dark:border-rose-800 text-rose-500"
                        : "bg-white/80 border-slate-200/50 dark:bg-slate-800/80 dark:border-slate-700/50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30"
                    }`}
                  >
                    <Heart className={`w-4 h-4 transition-colors ${isInWishlist ? "fill-rose-500 text-rose-500" : "group-hover/btn:fill-rose-500"}`} />
                  </button>

                  {/* Out-of-stock overlay */}
                  {outOfStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
                      <span className="inline-flex items-center px-3 py-1 text-xs font-bold rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.name}
                  </h3>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= Math.round(item.averageRating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-slate-200 dark:fill-slate-600 text-slate-200 dark:text-slate-600"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                      ({item.numReviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-auto flex items-center gap-2 mb-4">
                    <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                      EGP&nbsp;{item.discountPrice}
                    </span>
                    {item.discountPrice < item.price && (
                      <span className="text-sm text-slate-400 dark:text-slate-500 line-through">
                        EGP&nbsp;{item.price}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart / Out of Stock button */}
                  {outOfStock ? (
                    <button
                      disabled
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Out of Stock
                    </button>
                  ) : (
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddRelatedToCart(item._id);
                      }}
                      disabled={addingRelatedCartId === item._id}
                      className="w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {addingRelatedCartId === item._id ? (
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <ShoppingCart className="w-4 h-4" />
                      )}
                      {addingRelatedCartId === item._id ? "Adding..." : "Add to Cart"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}