import {  HiShoppingCart } from "react-icons/hi";
import { useState } from "react";
import ImagesList from "../../features/HomePage/components/imgesLIst"
import CategoryCardList from "../../features/HomePage/components/categoryCardLIst"
import { useNavigate } from "react-router";
import { FaHeart } from "react-icons/fa";

export default function ProductCard({product, onView, AddToCart }) {
    const [clickAdd, setClickAdd] = useState(false);
    const navigate = useNavigate();
    const hasDiscount = Number(product.discountPrice) !== 0;
    const [clickedFav, setClickedFav] = useState(false);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group">

            <div className="relative overflow-hidden">
                <ImagesList featured={product.featured} images={product.images} />

                <div className="absolute bottom-2 left-2">
                    {Number(product.stock) === 0 ? (
                        <span className="bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                            Out of Stock
                        </span>
                    ) : (
                        <span className="bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                            {product.stock} in stock
                        </span>
                    )}
                </div>
            </div>

            <div className="p-4 flex flex-col gap-3 flex-1">

                <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">
                    {[product.category, product.subcategory, product.brand]
                        .filter(Boolean)
                        .join(" · ")}
                </p>

                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-base leading-snug line-clamp-2 flex-1">{product.name}</h3>
                    <button onClick={()=>setClickedFav(!clickedFav)} className={`transition-colors ${clickedFav ? "text-red-500" : "text-gray-200"}`}><FaHeart className="text-2xl" /></button>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2 leading-relaxed">{product.shortDescription}</p>

                <div>
                    {hasDiscount ? (
                        <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">${product.price}</span>
                            <span className="text-sm font-medium text-red-400 dark:text-red-400 line-through">${product.discountPrice} off</span>
                        </div>
                    ) : (
                        <span className="text-xl font-bold text-gray-900 dark:text-gray-100">${product.price}</span>
                    )}
                </div>

                <CategoryCardList cats={product.tags} />

                <div className="flex flex-col gap-2 mt-auto pt-2 border-t border-gray-50 dark:border-gray-700">
                    
                    
                        <button
                        onClick={() => {
                            setClickAdd(!clickAdd);
                            AddToCart(product);
                            
                        }}
                        className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95
                            ${clickAdd 
                                ? "bg-red-50 text-red-500 hover:bg-red-100 border border-red-200"
                                : "bg-teal-500 text-white hover:bg-teal-600 shadow-md shadow-teal-100"
                            }`}
                    >
                        <HiShoppingCart className="text-base" />
                        {clickAdd ? "added to cart" : "Add to Cart"}
                    </button>
                    
                </div>
            </div>
        </div>
    )
}