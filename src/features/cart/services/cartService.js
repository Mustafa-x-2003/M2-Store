import axios from "axios";

const API_BASE_URL = "https://e-commerce-api-3wara.vercel.app";

// Helper to get auth headers
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}


// Add product to cart
export async function addToCart(productId, quantity = 1) {
  const response = await axios.post(
    `${API_BASE_URL}/carts/items`,
    { productId, quantity },
    { headers: getAuthHeaders() }
  );
  return response.data;
}
