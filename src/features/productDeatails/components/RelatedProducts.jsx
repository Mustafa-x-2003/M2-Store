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
    <section className="mt-20 lg:mt-32">
      <div className="flex items-center justify-between mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-300 transition-colors duration-300">
          You May Also Like
        </h2>
      </div>

      {/* Loading skeleton */}
      {relatedLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse rounded-[2rem] overflow-hidden">
              <div className="aspect-[4.5/5] bg-slate-200 dark:bg-slate-800 rounded-[2rem] transition-colors duration-300" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded transition-colors duration-300" />
                <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded transition-colors duration-300" />
                <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-xl transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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