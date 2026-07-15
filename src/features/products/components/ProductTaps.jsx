import { Star, Trash2, Loader2 } from "lucide-react";
import { useProduct } from "../context/ProductContext";
import { useAuth } from "../../../context/AuthContext";

export default function ProductTabs() {
  const {
    product,
    loading,
    activeTab,
    setActiveTab,
    reviewRating,
    setReviewRating,
    reviewComment,
    setReviewComment,
    reviewLoading,
    handleSubmitReview,
    handleDeleteReview,
  } = useProduct();

  const { user } = useAuth();

  if (loading || !product) return null;

  return (
    <div className="mt-20 lg:mt-32">
      {/* Tab buttons */}
      <div className="flex w-full overflow-x-auto border-b border-slate-200 dark:border-slate-800 mb-8 hide-scrollbar">
        <button
          onClick={() => setActiveTab("description")}
          className={`flex-1 sm:flex-none text-center pb-4 px-4 sm:px-8 text-base sm:text-lg font-bold transition-colors relative cursor-pointer whitespace-nowrap ${
            activeTab === "description"
              ? "text-slate-900 dark:text-white"
              : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          }`}
        >
          Description
          {activeTab === "description" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900 dark:bg-white rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`flex-1 sm:flex-none text-center pb-4 px-4 sm:px-8 text-base sm:text-lg font-bold transition-colors relative cursor-pointer whitespace-nowrap ${
            activeTab === "reviews"
              ? "text-slate-900 dark:text-white"
              : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          }`}
        >
          Reviews ({product.reviews?.length || 0})
          {activeTab === "reviews" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900 dark:bg-white rounded-t-full" />
          )}
        </button>
      </div>

      {/* Tab content */}
      <div className="py-4">
        {activeTab === "description" ? (
          <div className="max-w-3xl">
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed break-words whitespace-pre-wrap">
              {product.description}
            </p>
          </div>
        ) : (
          <div className="max-w-3xl space-y-6">
            {/* Write a Review form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitReview();
              }}
              className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm"
            >
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
                Write a Review
              </h4>

              {/* Interactive star rating */}
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    className="cursor-pointer p-0.5"
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        star <= reviewRating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-200 dark:fill-slate-600 text-slate-200 dark:text-slate-600"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Comment */}
              <textarea
                placeholder="Share your thoughts..."
                rows="3"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />

              {/* Submit button */}
              <button
                type="submit"
                disabled={reviewLoading}
                className="mt-3 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-lg font-semibold text-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {reviewLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Submit Review
              </button>
            </form>

            {/* Reviews list */}
            {product.reviews?.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-slate-50 dark:bg-slate-900 rounded-xl p-5 border border-slate-100 dark:border-slate-800"
                  >
                    {/* Review header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white uppercase truncate">
                          {review.user?.username || "Anonymous"}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500 flex-shrink-0">
                          {new Date(review.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      {/* Delete button — only for review author */}
                      {user && (review.user?._id === user._id || review.user === user._id) && (
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer p-1"
                          title="Delete review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-0.5 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "fill-slate-200 dark:fill-slate-700 text-slate-200 dark:text-slate-700"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 dark:text-slate-400">
                No reviews yet. Be the first!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}