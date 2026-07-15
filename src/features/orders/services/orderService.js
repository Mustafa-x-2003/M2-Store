const API_BASE_URL = "https://e-commerce-api-3wara.vercel.app";

/**
 * Fetch a single order's details by its ID.
 * GET /orders/my/{id}
 *
 * NOTE: This assumes the auth token is stored in localStorage under the key "token".
 * If your project stores it under a different key (e.g. "accessToken"), update the
 * line below accordingly.
 */
export const getOrderById = async (orderId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/orders/my/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch order details");
    }

    const data = await response.json();
    return data.order;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

/**
 * Cancel an order by its ID.
 * PATCH /orders/my/{id}/cancel
 */
export const cancelOrder = async (orderId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_BASE_URL}/orders/my/${orderId}/cancel`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to cancel order");
    }

    const data = await response.json();
    return data.order;
  } catch (error) {
    console.error("Error cancelling order:", error);
    throw error;
  }
};
