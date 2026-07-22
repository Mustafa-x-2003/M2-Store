import ProductCard from "../../../components/common/productCard"
import { HiOutlineEmojiSad, HiArrowNarrowRight } from "react-icons/hi"
import { useNavigate } from "react-router"
export default function ProductList({products, loading, error, AddToCart }) {
    const navigate = useNavigate()
 

    if (error) return (
        <div className="flex items-center justify-center py-16">
            <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 text-red-500 dark:text-red-400 rounded-2xl px-6 py-4 text-sm font-medium">
                ⚠️ {String(error)}
            </div>
        </div>
    )

    if (!products || products.length === 0) return (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400 dark:text-gray-500">
            <HiOutlineEmojiSad className="text-5xl" />
            <p className="text-base font-medium">No products found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
        </div>
    )

    return (
        <div className=" mx-auto px-4 sm:px-8 md:px-12 max-w-[1350px]  lg:px-20 pb-12 pt-10">
            {/* Header Section */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                        Featured Products
                    </h2>
                    <p className="mt-1 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                        Handpicked just for you
                    </p>
                </div>
                <button onClick={() => navigate("/shop")} className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-150 cursor-pointer">
                    View All <HiArrowNarrowRight className="text-sm sm:text-base" />
                    
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {products.map(product => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        AddToCart={AddToCart}
                    />
                ))}
            </div>
        </div>
    )
}