import { motion, AnimatePresence } from "framer-motion";
import { HiStar } from "react-icons/hi";

export default function ProductImage({ imageUrl, featured,category }) {
  return (
    <div className="w-full aspect-4/5 relative rounded-t-2xl overflow-hidden bg-gray-100 dark:bg-gray-700">
      <AnimatePresence mode="wait">
        <motion.img
          key={imageUrl}
          src={imageUrl}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
        />
      </AnimatePresence>

        <div className="absolute top-2 left-2 flex items-center gap-1 bg-[var(--primary-light)] text-[var(--primary)] text-xs font-semibold px-3 py-1 rounded-full shadow-[var(--shadow)]">
          <h2>{category}</h2>
        </div>
    </div>
  );
}