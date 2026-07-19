import ProductCard from "../../../components/common/productCard"
import { HiOutlineEmojiSad, HiArrowNarrowRight } from "react-icons/hi"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
export default function ProductList({products, loading, error, AddToCart }) {
    const x=useNavigate()
    if (loading) return (
        <div className="flex justify-center items-center min-h-[300px]">
          <AiOutlineLoading3Quarters className="animate-spin text-4xl text-[var(--primary)]" />
        </div>
    )

    if (error) return (
        <div className="flex items-center justify-center py-16">
            <div className="bg-[var(--danger-light)] border border-[var(--border)] text-[var(--danger)] rounded-2xl px-6 py-4 text-sm font-medium">
                ⚠️ {String(error)}
            </div>
        </div>
    )

    if (!products || products.length === 0) return (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-[var(--text-muted)]">
            <HiOutlineEmojiSad className="text-5xl" />
            <p className="text-base font-medium">No products found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
        </div>
    )

    return (
        <div className="w-[90%] mx-auto py-14 px-6 sm:px-8 md:px-10 max-w-[1350px]">
            {/* Header Section */}
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
                        Featured Products
                    </h2>
                    <p className="mt-1 text-sm sm:text-base text-[var(--text-secondary)]">
                        Handpicked just for you
                    </p>
                </div>
                <button className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors duration-200 cursor-pointer" onClick={()=>x("/products")}>
                    View All <HiArrowNarrowRight className="text-sm sm:text-base" />
                </button>
            </div>

            {/* Grid */}
            <>
  {/* Mobile Only */}
  <div className="block sm:hidden">
    <Swiper
      modules={[Pagination, Autoplay]}
      slidesPerView={1.15}
      spaceBetween={16}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
    >
      {products.map((product) => (
        <SwiperSlide key={product._id}>
          <ProductCard
            product={product}
            AddToCart={AddToCart}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>

  {/* Tablet & Desktop */}
  <div
    className="
      hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6 xl:grid-cols-4
    "
  >
    {products.map((product) => (
        <ProductCard
      key={product._id}
      product={product}
      AddToCart={AddToCart}
    />
    ))}
  </div>
</>
        </div>
    )
}