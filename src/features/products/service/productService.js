import axios from "axios";

const API_BASE_URL = "https://e-commerce-api-3wara.vercel.app";

// Helper to get auth headers
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Get all products
export async function getAllProducts() {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
}

// Get a single product by ID
export async function getProductById(id) {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`);
  return response.data;
}

// Submit a review for a product
export async function submitReview(productId, { rating, comment }) {
  const response = await axios.post(
    `${API_BASE_URL}/products/${productId}/reviews`,
    { rating, comment },
    { headers: getAuthHeaders() }
  );
  return response.data;
}

// Delete a review
export async function deleteReview(productId, reviewId) {
  const response = await axios.delete(
    `${API_BASE_URL}/products/${productId}/reviews/${reviewId}`,
    { headers: getAuthHeaders() }
  );
  return response.data;
}

// Get current user's wishlist
export async function getMyWishlist() {
  const response = await axios.get(`${API_BASE_URL}/wishlists/my`, {
    headers: getAuthHeaders(),
  });
  return response.data;
}

// Add product to wishlist
export async function addToWishlist(productId) {
  const response = await axios.post(
    `${API_BASE_URL}/wishlists/add/${productId}`,
    {},
    { headers: getAuthHeaders() }
  );
  return response.data;
}

// Remove product from wishlist
export async function removeFromWishlist(productId) {
  const response = await axios.delete(
    `${API_BASE_URL}/wishlists/remove/${productId}`,
    { headers: getAuthHeaders() }
  );
  return response.data;
}
