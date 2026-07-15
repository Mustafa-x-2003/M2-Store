export const initialState = {
  // Current product state
  product: null,
  loading: true,
  error: null,

  // Related products state
  relatedProducts: [],
  relatedLoading: true,

  // UI state
  quantity: 1,
  activeTab: "description",

  // Review form state
  reviewRating: 0,
  reviewComment: "",
  reviewLoading: false,

  // Wishlist state
  wishlistProductIds: [],
  wishlistLoading: false,

  // Cart state
  addToCartLoading: false,
  addingRelatedCartId: null,
};

export function productReducer(state, action) {
  switch (action.type) {
    case "FETCH_PRODUCT_START":
      return { ...state, loading: true, error: null };
    case "FETCH_PRODUCT_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "FETCH_PRODUCT_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "FETCH_RELATED_START":
      return { ...state, relatedLoading: true };
    case "FETCH_RELATED_SUCCESS":
      return { ...state, relatedLoading: false, relatedProducts: action.payload };
    case "FETCH_RELATED_ERROR":
      return { ...state, relatedLoading: false };

    case "FETCH_WISHLIST_SUCCESS":
      return { ...state, wishlistProductIds: action.payload };

    case "SET_QUANTITY":
      return { ...state, quantity: action.payload };

    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payload };

    case "SET_REVIEW_RATING":
      return { ...state, reviewRating: action.payload };
    case "SET_REVIEW_COMMENT":
      return { ...state, reviewComment: action.payload };

    case "SUBMIT_REVIEW_START":
      return { ...state, reviewLoading: true };
    case "SUBMIT_REVIEW_SUCCESS":
      return {
        ...state,
        reviewLoading: false,
        product: action.payload,
        reviewRating: 0,
        reviewComment: "",
      };
    case "SUBMIT_REVIEW_ERROR":
      return { ...state, reviewLoading: false };

    case "DELETE_REVIEW_SUCCESS":
      return { ...state, product: action.payload };

    case "TOGGLE_WISHLIST_START":
      return { ...state, wishlistLoading: true };
    case "ADD_TO_WISHLIST_SUCCESS":
      return {
        ...state,
        wishlistLoading: false,
        wishlistProductIds: [...state.wishlistProductIds, action.payload],
      };
    case "REMOVE_FROM_WISHLIST_SUCCESS":
      return {
        ...state,
        wishlistLoading: false,
        wishlistProductIds: state.wishlistProductIds.filter((id) => id !== action.payload),
      };
    case "TOGGLE_WISHLIST_ERROR":
      return { ...state, wishlistLoading: false };

    case "ADD_TO_CART_START":
      return { ...state, addToCartLoading: true };
    case "ADD_TO_CART_SUCCESS":
    case "ADD_TO_CART_ERROR":
      return { ...state, addToCartLoading: false };

    case "ADD_RELATED_CART_START":
      return { ...state, addingRelatedCartId: action.payload };
    case "ADD_RELATED_CART_SUCCESS":
    case "ADD_RELATED_CART_ERROR":
      return { ...state, addingRelatedCartId: null };

    default:
      return state;
  }
}
