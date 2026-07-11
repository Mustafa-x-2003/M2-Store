

export const ENDPOINTS = {
  // ─── Auth ────────────────────────────────────────────────────────────────
  AUTH: {
    SEND_REGISTER_OTP:    "/auth/register/send-otp",
    VERIFY_REGISTER_OTP:  "/auth/register/verify-otp",
    LOGIN:                "/auth/login",
    LOGOUT:               "/auth/logout",
    SEND_RESET_OTP:       "/auth/forgot-password/send-otp",
    VERIFY_RESET_OTP:     "/auth/forgot-password/verify-otp",
    ME:                   "/auth/me",
    ADMIN_TEST:           "/auth/admin-test",
    CHANGE_ROLE:          "/auth/change-role",
  },

  // ─── Users ───────────────────────────────────────────────────────────────
  USERS: {
    ALL:     "/users/all",
    ADD:     "/users/add",
    BY_ID:   (id) => `/users/${id}`,
  },

  // ─── Products ─────────────────────────────────────────────────────────────
  PRODUCTS: {
    BASE:    "/products",
    SEARCH:  "/products/search",
    BY_ID:   (id) => `/products/${id}`,
    UPDATE:  (id) => `/products/update/${id}`,
  },

  // ─── Reviews ──────────────────────────────────────────────────────────────
  REVIEWS: {
    BY_PRODUCT: (productId)             => `/products/${productId}/reviews`,
    BY_ID:      (productId, reviewId)   => `/products/${productId}/reviews/${reviewId}`,
  },

  // ─── Cart ─────────────────────────────────────────────────────────────────
  CART: {
    MY_CART:           "/carts",
    ITEMS:             "/carts/items",
    ITEM_BY_PRODUCT:   (productId) => `/carts/items/${productId}`,
    COUPON:            "/carts/coupon",
    CLEAR:             "/carts/clear",
  },

  // ─── Orders (User) ────────────────────────────────────────────────────────
  ORDERS: {
    PLACE:       "/orders",
    MY_ORDERS:   "/orders/my",
    MY_BY_ID:    (id) => `/orders/my/${id}`,
    MY_CANCEL:   (id) => `/orders/my/${id}/cancel`,
  },

  // ─── Orders (Admin) ───────────────────────────────────────────────────────
  ORDERS_ADMIN: {
    DASHBOARD:  "/orders/admin/dashboard",
    ALL_CARTS:  "/orders/admin/carts",
    ALL:        "/orders/admin",
    BY_ID:      (id) => `/orders/admin/${id}`,
    STATUS:     (id) => `/orders/admin/${id}/status`,
  },

  // ─── Wishlist (User) ──────────────────────────────────────────────────────
  WISHLIST: {
    ADD:    (productId) => `/wishlists/add/${productId}`,
    REMOVE: (productId) => `/wishlists/remove/${productId}`,
    MY:     "/wishlists/my",
    CLEAR:  "/wishlists/clear",
  },

  // ─── Wishlist (Admin) ─────────────────────────────────────────────────────
  WISHLIST_ADMIN: {
    ALL:    "/wishlists/admin/all",
    STATS:  "/wishlists/admin/stats",
  },
};
