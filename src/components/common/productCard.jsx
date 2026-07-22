import {  HiShoppingCart } from "react-icons/hi";
import { useState } from "react";
import ImagesList from "../../features/HomePage/components/imgesLIst"
import CategoryCardList from "../../features/HomePage/components/categoryCardLIst"
import { useNavigate } from "react-router";
import { FaHeart } from "react-icons/fa";
import useProductCart from "../../features/HomePage/hooks/useProductCart";
import {addToWishlist, removeFromWishlist,
} from "../../features/productDeatails/service/productService";
import { FaStar } from "react-icons/fa";
import { useWishlist } from "../../features/Wishlist/context/WishlistContext";
import toast from "react-hot-toast";

export default function ProductCard({product }) {
    const {loading ,error , addProduct} = useProductCart()
    const [clickAdd, setClickAdd] = useState(false);
    const navigate = useNavigate();
    const hasDiscount = Number(product.discountPrice) !== 0;
    const { wishlistProductIds, toggleWishlist } = useWishlist();
    const isInWishlist = wishlistProductIds.includes(product._id);
    const outOfStock = Number(product.stock) === 0;

    return (
        <div className="bg-white w-full max-w-full  dark:bg-gray-800 rounded-xl shadow-sm border border-gray-300 dark:border-gray-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
            onClick={()=>navigate(`/products/${product._id}`)}
        >

            <div className="relative overflow-hidden">
                
                <ImagesList featured={product.featured} images={product.images} />

                {/* Category */}
                <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-blue-200/80 backdrop-blur-md text-slate-700 shadow-sm">
                    {product.category}
                </span>

                {/* Discount */}
                {hasDiscount && (
                    <span className="absolute top-4 right-16 inline-flex items-center px-3 py-1 text-xs font-bold rounded-full bg-rose-100 text-rose-700 shadow-sm">
                        -
                        {Math.round(
                            ((product.price - product.discountPrice) / product.price) * 100
                        )}
                        %
                    </span>
                )}

                {/* Wishlist */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product._id);
                    }}
                    className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all ${isInWishlist
                            ? "bg-rose-50 text-rose-500"
                            : "bg-white/80 text-gray-400 hover:text-rose-500"
                        }`}
                >
                    <FaHeart className={isInWishlist ? "fill-rose-500" : ""} />
                </button>


                
                {outOfStock ? (
                    <div className="absolute bottom-0 w-full h-full flex items-center justify-center bg-black/20 left-0">
                        <span className="bg-red-100 text-red-600 text-xs  font-semibold px-2.5 py-1 rounded-full">
                            Out of Stock
                        </span>

                    </div>   
                    ) : (
                        <span>
                        </span>
                    )}
                
            </div>

            <div className="p-4  flex flex-col justify-between gap-3 flex-1">

                

                <div className="flex flex-col items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-base leading-snug line-clamp-2 flex-1">{product.name}</h3>
                    
                    
                    
                    

                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                className={
                                    star <= Math.round(product.rating || 0)
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                }
                                size={14}
                            />
                        ))}

                        <span className="ml-1 text-xs text-gray-500">
                            ({product.rating || 0})
                        </span>
                    </div>


                </div>

              

                <div>
                    {hasDiscount ? (
                        <div className="flex items-center justif gap-2 flex-wrap">
                            <span className="text-xl font-bold text-blue-800 dark:text-gray-100 ">EGP {product.price}</span>
                            <span className="text-sm font-medium text-gray-400 dark:text-red-400 line-through">EGP {product.discountPrice} off</span>
                        </div>
                    ) : (
                        <span className="text-xl font-bold text-gray-900 dark:text-gray-100">${product.price}</span>
                    )}
                </div>

                <div className="flex flex-col gap-2 mt-3 pt-2 border-t border-gray-50 dark:border-gray-700">
                    
                    <button
                        onClick={async (e) => {
                            e.stopPropagation();

                            if (outOfStock) return;

                            const res = await addProduct({
                                productId: product._id,
                                quantity: 1,
                            });

                            if (res) setClickAdd(true);
                        }}
                        disabled={loading || outOfStock}
                        className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95
    ${outOfStock
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : clickAdd
                                    ? "bg-red-50 text-red-500 hover:bg-red-100 border border-red-200"
                                    : "bg-blue-800 text-white hover:bg-blue-800/50"
                            }`}
                    >
                        <HiShoppingCart className="text-base" />

                        {outOfStock
                            ? "Out of Stock"
                            : loading
                                ? "Adding..."
                                : clickAdd
                                    ? "Added to Cart"
                                    : "Add to Cart"}
                    </button>

                    
                </div>
            </div>
        </div>
    )
}







