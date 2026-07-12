import { motion, AnimatePresence } from "framer-motion";
import { HiStar } from "react-icons/hi";

export default function ProductImage({ imageUrl, featured }) {
  return (
    <div className="w-full h-48 relative rounded-t-2xl overflow-hidden bg-gray-100 dark:bg-gray-700">
      <AnimatePresence mode="wait">
        <motion.img
          key={imageUrl}
          src={imageUrl}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>

      {featured && (
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-amber-400 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow">
          <HiStar className="text-sm" />
          Featured
        </div>
      )}
    </div>
  );
}