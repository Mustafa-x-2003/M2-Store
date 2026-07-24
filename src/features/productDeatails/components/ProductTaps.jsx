import { Star, Trash2, Loader2, MessageSquare, CalendarDays } from "lucide-react";
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

  const reviewsCount = product.reviews?.length || 0;

  return (
    <section className="mt-16 w-full transition-colors duration-300 sm:mt-24 lg:mt-32">
      {/* =========================
          TABS
      ========================== */}

      <div className="border-b border-[var(--border)]">
        <div className="flex w-full">
          <button
            onClick={() => setActiveTab("description")}
            className={`
              relative flex-1 cursor-pointer
              px-3 pb-4 text-center
              text-sm font-semibold
              transition-colors duration-300
              sm:flex-none sm:px-8 sm:text-base
              ${
                activeTab === "description"
                  ? "text-[var(--text)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }
            `}
          >
            Description

            {activeTab === "description" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[var(--primary)]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`
              relative flex-1 cursor-pointer
              px-3 pb-4 text-center
              text-sm font-semibold
              transition-colors duration-300
              sm:flex-none sm:px-8 sm:text-base
              ${
                activeTab === "reviews"
                  ? "text-[var(--text)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }
            `}
          >
            <span className="inline-flex items-center gap-2">
              Reviews

              <span
                className="
                  rounded-full
                  bg-[var(--surface-secondary)]
                  px-2 py-0.5
                  text-xs
                  text-[var(--text-secondary)]
                "
              >
                {reviewsCount}
              </span>
            </span>

            {activeTab === "reviews" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[var(--primary)]" />
            )}
          </button>
        </div>
      </div>

      {/* =========================
          CONTENT
      ========================== */}

      <div className="py-8 sm:py-12">
        {activeTab === "description" ? (
          <div className="max-w-4xl">
            <p className="text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
              {product.description}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* =========================
                REVIEW FORM
            ========================== */}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitReview();
              }}
              className="
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--surface)]
                p-4
                shadow-[var(--shadow)]
                transition-colors duration-300
                sm:p-6
                lg:p-8
              "
            >
              {/* Header */}
              <div className="mb-6 flex items-start gap-3">
                <div
                  className="
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-[var(--primary-light)]
                  "
                >
                  <MessageSquare className="h-5 w-5 text-[var(--primary)]" />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-[var(--text)] sm:text-lg">
                    Share your experience
                  </h3>

                  <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
                    Your feedback helps other customers make better decisions.
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-5">
                <p className="mb-2 text-sm font-medium text-[var(--text-secondary)]">
                  How would you rate this product?
                </p>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="
                        cursor-pointer
                        rounded-lg
                        p-1
                        transition-transform duration-200
                        hover:scale-110
                      "
                    >
                      <Star
                        className={`
                          h-6 w-6
                          transition-colors duration-300
                          ${
                            star <= reviewRating
                              ? "fill-[var(--warning)] text-[var(--warning)]"
                              : "fill-[var(--surface-secondary)] text-[var(--border)]"
                          }
                        `}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <textarea
                placeholder="Write your review..."
                rows={4}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border border-[var(--input-border)]
                  bg-[var(--input-bg)]
                  px-4 py-3
                  text-sm
                  text-[var(--text)]
                  outline-none
                  transition-colors duration-300
                  placeholder:text-[var(--text-muted)]
                  focus:border-[var(--input-focus)]
                  focus:ring-4
                  focus:ring-[var(--primary-light)]
                  sm:text-base
                "
              />

              {/* Button */}
              <button
                type="submit"
                disabled={reviewLoading}
                className="
                  mt-4
                  flex
                  w-full
                  cursor-pointer
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[var(--primary)]
                  px-6 py-3
                  text-sm
                  font-semibold
                  text-white
                  transition-colors duration-300
                  hover:bg-[var(--primary-hover)]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  sm:w-auto
                "
              >
                {reviewLoading && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}

                Submit Review
              </button>
            </form>

            {/* =========================
                REVIEWS
            ========================== */}

            {reviewsCount > 0 ? (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {product.reviews.map((review) => (
                  <article
                    key={review._id}
                    className="
                      flex
                      min-w-0
                      flex-col
                      rounded-2xl
                      border border-[var(--border)]
                      bg-[var(--surface)]
                      p-5
                      shadow-sm
                      transition-colors duration-300
                      sm:p-6
                    "
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h4 className="truncate text-sm font-bold uppercase text-[var(--text)]">
                          {review.user?.username || "Anonymous"}
                        </h4>

                        <div className="mt-2 flex flex-wrap items-center gap-3">
                          {/* Stars */}
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`
                                  h-4 w-4
                                  transition-colors duration-300
                                  ${
                                    star <= review.rating
                                      ? "fill-[var(--warning)] text-[var(--warning)]"
                                      : "fill-[var(--surface-secondary)] text-[var(--border)]"
                                  }
                                `}
                              />
                            ))}
                          </div>

                          {/* Date */}
                          <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                            <CalendarDays className="h-3.5 w-3.5" />

                            {new Date(review.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Delete */}
                      {user &&
                        (review.user?._id === user._id ||
                          review.user === user._id) && (
                          <button
                            onClick={() => handleDeleteReview(review._id)}
                            title="Delete review"
                            className="
                              shrink-0
                              cursor-pointer
                              rounded-lg
                              p-2
                              text-[var(--text-muted)]
                              transition-colors duration-300
                              hover:bg-[var(--danger-light)]
                              hover:text-[var(--danger)]
                            "
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                    </div>

                    {/* Comment */}
                    <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">
                      {review.comment}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  border border-dashed border-[var(--border)]
                  bg-[var(--surface-secondary)]
                  px-6 py-12
                  text-center
                  transition-colors duration-300
                "
              >
                <div
                  className="
                    mb-4
                    flex h-14 w-14
                    items-center justify-center
                    rounded-2xl
                    bg-[var(--primary-light)]
                  "
                >
                  <MessageSquare className="h-6 w-6 text-[var(--primary)]" />
                </div>

                <h3 className="font-semibold text-[var(--text)]">
                  No reviews yet
                </h3>

                <p className="mt-2 max-w-sm text-sm text-[var(--text-muted)]">
                  Be the first customer to share your experience with this
                  product.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}