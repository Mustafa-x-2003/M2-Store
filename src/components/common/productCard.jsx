import {  HiShoppingCart } from "react-icons/hi";
import { useState } from "react";
import ImagesList from "../../features/HomePage/components/imgesLIst"
import CategoryCardList from "../../features/HomePage/components/categoryCardLIst"
import { useNavigate } from "react-router";
import { FaHeart } from "react-icons/fa";
import useProductCart from "../../features/HomePage/hooks/useProductCart";

export default function ProductCard({product }) {
    const {loading ,error , addProduct} = useProductCart()
    const [clickAdd, setClickAdd] = useState(false);
    const navigate = useNavigate();
    const hasDiscount = Number(product.discountPrice) !== 0;
    const [clickedFav, setClickedFav] = useState(false);

    return (
        <div className="bg-white w-full max-w-full  dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
            onClick={()=>navigate(`/products/${product._id}`)}
        >

            <div className="relative overflow-hidden">
                <ImagesList featured={product.featured} images={product.images} />

                <div className="absolute bottom-2 left-2">
                    {Number(product.stock) === 0 ? (
                        <span className="bg-red-500 text-white text-md font-semibold px-2.5 py-1 rounded-lg">
                            Out of Stock
                        </span>
                    ) : (
                        <span className="bg-green-500 text-white text-md font-semibold px-2.5 py-1 rounded-lg">
                            {product.stock} in stock
                        </span>
                    )}
                </div>
            </div>

            <div className="p-4  flex flex-col justify-between gap-3 flex-1">

                <p className="text-sm  text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">
                    {[product.category, product.subcategory, product.brand]
                        .filter(Boolean)
                        .join(" · ")}
                </p>

                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-base leading-snug line-clamp-2 flex-1">{product.name}</h3>
                    <button onClick={(e)=>{ e.stopPropagation(); setClickedFav(!clickedFav); }} className={`transition-colors ${clickedFav ? "text-red-500" : "text-gray-200"}`}><FaHeart className="text-2xl" /></button>
                </div>

                {/* <p className="text-gray-500 dark:text-gray-400 text-md line-clamp-2 leading-relaxed">{product.shortDescription}</p> */}

                <div>
                    {hasDiscount ? (
                        <div className="flex items-baseline gap-2 mb-3 flex-wrap">
                            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">${product.price}</span>
                            <span className="text-sm font-medium text-red-400 dark:text-red-400 line-through">${product.discountPrice} off</span>
                        </div>
                    ) : (
                        <span className="text-xl font-bold text-gray-900 dark:text-gray-100">${product.price}</span>
                    )}
                </div>

                {/* <CategoryCardList cats={product.tags} /> */}

                <div className="flex flex-col gap-2 mt-3 pt-2 border-t border-gray-50 dark:border-gray-700">
                    
                    
                        <button
                        onClick={async (e) => {
                            e.stopPropagation();
                            const res = await addProduct({productId: product._id , quantity: 1});
                            if (res) setClickAdd(true);
                        }}
                        disabled={loading}
                        className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95
                            ${clickAdd 
                                ? "bg-red-50 text-red-500 hover:bg-red-100 border border-red-200"
                                : "bg-blue-800 text-white shadow-xl  hover:bg-blue-800/50"
                            }`}
                    >
                        <HiShoppingCart className="text-base" />
                        {loading ? "Adding..." : clickAdd ? "Added to Cart" : "Add to Cart"}
                    </button>
                    
                </div>
            </div>
        </div>
    )
}