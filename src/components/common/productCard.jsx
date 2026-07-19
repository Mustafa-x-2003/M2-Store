import {  HiShoppingCart } from "react-icons/hi";
import { useState } from "react";
import ImagesList from "../../features/HomePage/components/imgesLIst"
import CategoryCardList from "../../features/HomePage/components/categoryCardLIst"
import { useNavigate } from "react-router";
import { FaHeart } from "react-icons/fa";
import useProductCart from "../../features/HomePage/hooks/useProductCart";
import {addToWishlist, removeFromWishlist,
} from "../../features/products/service/productService";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-hot-toast";
export default function ProductCard({product }) {
    const {loading ,error , addProduct} = useProductCart()
    const [clickAdd, setClickAdd] = useState(false);
    const navigate = useNavigate();
    const hasDiscount = Number(product.discountPrice) !== 0;
    const isOutOfStock = Number(product.stock) === 0;
    const [clickedFav, setClickedFav] = useState(false);

    return (
        <div className="max-w-[90%] bg-[var(--card)] rounded-xl shadow-sm border border-[var(--border)] hover:shadow-[var(--shadow)] hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer"
            onClick={()=>navigate(`/products/${product._id}`)}
        >

            <div className="relative overflow-hidden">
                <ImagesList featured={product.featured} images={product.images} category={product.category} />

                <div>
                    {isOutOfStock ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-[var(--overlay)]">
                        <span className="bg-[var(--danger-light)] dark:bg-red-200/90 text-[var(--danger)] text-md font-semibold px-2.5 py-1 rounded-full">
                            Out of Stock
                        </span>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>

            <div className="p-4  flex flex-col justify-between gap-3 flex-1">

                <p className="text-sm text-[var(--text-secondary)] font-medium uppercase tracking-wider">
                    {[product.category, product.subcategory, product.brand]
                        .filter(Boolean)
                        .join(" · ")}
                </p>

                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-[var(--text)] text-base leading-snug line-clamp-2 flex-1">{product.name}</h3>
                   <button onClick={async (e) => {
                    e.stopPropagation();
                    try {
                    if (clickedFav) {
                     await removeFromWishlist(product._id);
                      setClickedFav(false);
                     } else {
                     await addToWishlist(product._id);
                     setClickedFav(true);}
                     window.dispatchEvent(
                        new Event("navbar-counts-update"));
                    } catch (error) {
                        console.error("Wishlist update failed:", error);
                    }
                }}
                className={`transition-colors ${
                    clickedFav ? "text-[var(--danger)]" : "text-[var(--text-secondary)]" }`}>
                        <FaHeart className="text-2xl" />
                        </button>
                </div>

                <div>
                    {hasDiscount ? (
                        <div className="flex items-baseline gap-2 mb-3 flex-wrap">
                            <span className="text-xl font-bold text-[var(--primary)]">{`EGP ${Number(product.discountPrice).toLocaleString("en-US")}`}</span>
                            <span className="text-sm font-medium text-[var(--text-muted)] line-through">{`EGP ${Number(product.price).toLocaleString("en-US")}`}</span>
                        </div>
                    ) : (
                        <span className="text-xl font-bold text-[var(--primary)]">{`EGP ${Number(product.price).toLocaleString("en-US")}`}</span>
                    )}
                </div>

                {/* <CategoryCardList cats={product.tags} /> */}

                <div className="flex flex-col gap-2 ">
                    
                    
                       <button
  onClick={async (e) => {
  e.stopPropagation();

  if (isOutOfStock) return;

  const res = await addProduct({
    productId: product._id,
    quantity: 1,
  });

  if (res) {
    setClickAdd(true);
    toast.success("Added to cart");
  }
}}
  disabled={loading || isOutOfStock}
  className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95
    ${
      isOutOfStock
        ? "cursor-not-allowed bg-[var(--surface-secondary)] text-[var(--text-muted)]"
        : clickAdd
        ? "bg-[var(--danger-light)] text-[var(--danger)] border border-[var(--danger)] hover:bg-red-100"
        : "bg-[var(--primary)] text-[var(--text-inverse)] shadow-xl hover:bg-[var(--primary-hover)]"
    }`}
>

  {loading ? (
  <AiOutlineLoading3Quarters className="animate-spin text-lg text-[var(--primary)]" />
) : (
  <>
    {!isOutOfStock && (
      <HiShoppingCart className="text-lg" />
    )}

    <span>
      {isOutOfStock
        ? "Out of Stock"
        : clickAdd
        ? "Added to Cart"
        : "Add to Cart"}
    </span>
  </>
)}
</button>
                    
                </div>
            </div>
        </div>
    )
}