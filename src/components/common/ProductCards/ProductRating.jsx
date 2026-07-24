import { Star } from "lucide-react";

export default function ProductRating({
    rating = 0,
    reviews = 0,
}) {
    return (
        <div className="flex items-center gap-1 mt-1 ">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${star <= Math.round(rating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-slate-200 dark:fill-slate-600 text-slate-200 dark:text-slate-600"
                        } transition-colors duration-300`}
                />
            ))}

            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
                ({reviews})
            </span>
        </div>
    );
}