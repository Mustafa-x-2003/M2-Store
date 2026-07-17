import { createContext, useContext, useEffect, useReducer } from "react";
import { useParams } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import {
  getProductById,
  getAllProducts,
  submitReview,
  deleteReview,
  getMyWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../service/productService";
import { addToCart } from "../../cart/services/cartService";
import toast from "react-hot-toast";
import { initialState, productReducer } from "./productReducer";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const { id } = useParams();
  const { user } = useAuth();
  
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Fetch the current product when the ID changes
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      dispatch({ type: "FETCH_PRODUCT_START" });

      try {
        const data = await getProductById(id);
        dispatch({ type: "FETCH_PRODUCT_SUCCESS", payload: data.product });
      } catch (err) {
        console.error("Failed to fetch product:", err);
        dispatch({ 
          type: "FETCH_PRODUCT_ERROR", 
          payload: "Could not load this product. Please try again later." 
        });
      }
    };

    fetchProduct();
  }, [id]);

  // Fetch related products
  useEffect(() => {
    if (!state.product) return;

    const fetchRelated = async () => {
      dispatch({ type: "FETCH_RELATED_START" });

      try {
        const data = await getAllProducts();
        const filtered = data.products
          .filter((p) => p.category === state.product.category && p._id !== state.product._id)
          .slice(0, 4);

        dispatch({ type: "FETCH_RELATED_SUCCESS", payload: filtered });
      } catch (err) {
        console.error("Failed to fetch related products:", err);
        dispatch({ type: "FETCH_RELATED_ERROR" });
      }
    };

    fetchRelated();
  }, [state.product]);

  // Fetch user's wishlist
  useEffect(() => {
    if (!user) return;

    const fetchWishlist = async () => {
      try {
        const data = await getMyWishlist();
        const wishlistItems = data.wishlist?.products || data.products || [];
        const ids = wishlistItems.map((item) => item._id || item.product?._id || item);
        dispatch({ type: "FETCH_WISHLIST_SUCCESS", payload: ids });
      } catch (err) {
        // silently fail — user may not have a wishlist yet
        console.error("Failed to fetch wishlist:", err);
      }
    };

    fetchWishlist();
  }, [user]);

  // Quantity helpers 
  const increaseQuantity = () => {
    if (state.product && state.quantity < state.product.stock) {
      dispatch({ type: "SET_QUANTITY", payload: state.quantity + 1 });
    }
  };

  const decreaseQuantity = () => {
    dispatch({ type: "SET_QUANTITY", payload: Math.max(1, state.quantity - 1) });
  };
  
  // Setters for UI state 
  const setActiveTab = (tab) => dispatch({ type: "SET_ACTIVE_TAB", payload: tab });
  const setReviewRating = (rating) => dispatch({ type: "SET_REVIEW_RATING", payload: rating });
  const setReviewComment = (comment) => dispatch({ type: "SET_REVIEW_COMMENT", payload: comment });

  // Review actions 
  const handleSubmitReview = async () => {
    if (!user) {
      toast.error("Please login to submit a review");
      return;
    }

    if (state.reviewRating === 0) {
      toast.error("Please select a star rating");
      return;
    }

    if (!state.reviewComment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    dispatch({ type: "SUBMIT_REVIEW_START" });

    try {
      await submitReview(state.product._id, {
        rating: state.reviewRating,
        comment: state.reviewComment,
      });

      // Re-fetch product to get updated reviews & rating
      const data = await getProductById(state.product._id);
      
      dispatch({ type: "SUBMIT_REVIEW_SUCCESS", payload: data.product });
      toast.success("Review submitted successfully!");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to submit review. Please try again.";
      dispatch({ type: "SUBMIT_REVIEW_ERROR" });
      toast.error(message);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(state.product._id, reviewId);

      // Re-fetch product to get updated reviews & rating
      const data = await getProductById(state.product._id);
      
      dispatch({ type: "DELETE_REVIEW_SUCCESS", payload: data.product });
      toast.success("Review deleted");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete review.";
      toast.error(message);
    }
  };

  // Wishlist actions
 const toggleWishlist = async (productId) => {
  if (!user) {
    toast.error("Please login to manage your wishlist");
    return;
  }

  const idToToggle = productId || state.product?._id;
  if (!idToToggle) return;

  dispatch({ type: "TOGGLE_WISHLIST_START" });

  const isCurrentlyInWishlist =
    state.wishlistProductIds.includes(idToToggle);

  try {
    if (isCurrentlyInWishlist) {
      const response = await removeFromWishlist(idToToggle);

      console.log("REMOVE RESPONSE:", response);

      dispatch({
        type: "REMOVE_FROM_WISHLIST_SUCCESS",
        payload: idToToggle,
      });

      toast.success("Removed from wishlist");
    } else {
      const response = await addToWishlist(idToToggle);

      console.log("ADD RESPONSE:", response);

      dispatch({
        type: "ADD_TO_WISHLIST_SUCCESS",
        payload: idToToggle,
      });

      toast.success("Added to wishlist");
    }

    window.dispatchEvent(new Event("navbar-counts-update"));
  } catch (err) {
    console.error(
      "WISHLIST ERROR:",
      err.response?.status,
      err.response?.data,
      err
    );

    const message =
      err.response?.data?.message ||
      "Failed to update wishlist.";

    dispatch({ type: "TOGGLE_WISHLIST_ERROR" });
    toast.error(message);
  }
};

  // Cart actions
  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    if (!state.product || state.product.stock <= 0) {
      toast.error("This product is out of stock");
      return;
    }

    dispatch({ type: "ADD_TO_CART_START" });

    try {
      await addToCart(state.product._id, state.quantity);
      window.dispatchEvent(new Event("navbar-counts-update"));
      dispatch({ type: "ADD_TO_CART_SUCCESS" });
      toast.success("Added to cart successfully!");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to add to cart.";
      dispatch({ type: "ADD_TO_CART_ERROR" });
      toast.error(message);
    }
  };

  const handleAddRelatedToCart = async (productId) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    dispatch({ type: "ADD_RELATED_CART_START", payload: productId });

    try {
      await addToCart(productId, 1);
      window.dispatchEvent(new Event("navbar-counts-update"));
      dispatch({ type: "ADD_RELATED_CART_SUCCESS" });
      toast.success("Added to cart successfully!");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to add to cart.";
      dispatch({ type: "ADD_RELATED_CART_ERROR" });
      toast.error(message);
    }
  };

  // Computed values
  const isOutOfStock = state.product ? state.product.stock <= 0 : false;

  const discountPercentage =
    state.product && state.product.price > 0
      ? Math.round(((state.product.price - state.product.discountPrice) / state.product.price) * 100)
      : 0;

  return (
    <ProductContext.Provider
      value={{
        // Data
        product: state.product,
        loading: state.loading,
        error: state.error,
        relatedProducts: state.relatedProducts,
        relatedLoading: state.relatedLoading,

        // UI state
        quantity: state.quantity,
        activeTab: state.activeTab,
        setActiveTab,

        // Actions
        increaseQuantity,
        decreaseQuantity,

        // Review
        reviewRating: state.reviewRating,
        setReviewRating,
        reviewComment: state.reviewComment,
        setReviewComment,
        reviewLoading: state.reviewLoading,
        handleSubmitReview,
        handleDeleteReview,

        // Wishlist
        wishlistProductIds: state.wishlistProductIds,
        isInWishlist: state.product ? state.wishlistProductIds.includes(state.product._id) : false,
        wishlistLoading: state.wishlistLoading,
        toggleWishlist,

        // Cart
        handleAddToCart,
        addToCartLoading: state.addToCartLoading,
        handleAddRelatedToCart,
        addingRelatedCartId: state.addingRelatedCartId,

        // Computed
        isOutOfStock,
        discountPercentage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProduct = () => useContext(ProductContext);
