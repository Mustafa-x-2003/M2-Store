import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export default function ProductSlider({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const showArrows = isHovered && images?.length > 1;

    return (
        <div
            className="relative w-full overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            <div className="w-full aspect-[4/5] relative rounded-t-2xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={images[currentIndex]?.url}
                        src={images[currentIndex]?.url}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                </AnimatePresence>
            </div>

            {showArrows && (
                <>
                    <button
                        onClick={handlePrev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md"
                    >
                        <HiChevronLeft />
                    </button>

                    <button
                        onClick={handleNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md"
                    >
                        <HiChevronRight />
                    </button>
                </>
            )}

            {images?.length > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                        <span
                            key={i}
                            className={`block h-1.5 rounded-sm transition-all ${i === currentIndex ? "w-4 bg-teal-500" : "w-1.5 bg-white/75"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}