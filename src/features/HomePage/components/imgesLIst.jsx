import { useState, useEffect, useRef, useCallback } from "react";
import ProductImage from "./productImage";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export default function ImagesList({ images, featured }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const startAutoPlay = useCallback(() => {
    if (!images || images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
  }, [images]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isHovered) startAutoPlay();
    return () => stopAutoPlay();
  }, [images, isHovered, startAutoPlay, stopAutoPlay]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const showArrows = isHovered && images && images.length > 1;

  return (
    <div
      className="relative w-full h-48 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <ProductImage featured={featured} imageUrl={images[currentIndex]?.url} />

      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        aria-label="Previous image"
        className={`
          absolute left-2 top-1/2 z-10
          -translate-y-1/2 transition-all duration-300 ease-in-out
          w-8 h-8 flex items-center justify-center
          rounded-full bg-white/90 shadow-md backdrop-blur-sm
          cursor-pointer border-0 text-gray-700
          ${showArrows ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12 pointer-events-none"}
        `}
      >
        <HiChevronLeft className="text-lg text-gray-700" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        aria-label="Next image"
        className={`
          absolute right-2 top-1/2 z-10
          -translate-y-1/2 transition-all duration-300 ease-in-out
          w-8 h-8 flex items-center justify-center
          rounded-full bg-white/90 shadow-md backdrop-blur-sm
          cursor-pointer border-0 text-gray-700
          ${showArrows ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12 pointer-events-none"}
        `}
      >
        <HiChevronRight className="text-lg text-gray-700" />
      </button>

      {/* Dot indicators */}
      {images && images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <span
              key={i}
              className={`
                block h-1.5 rounded-sm transition-all duration-300 ease-in-out
                ${i === currentIndex ? "w-4 bg-teal-500" : "w-1.5 bg-white/75"}
              `}
            />
          ))}
        </div>
      )}
    </div>
  );
}