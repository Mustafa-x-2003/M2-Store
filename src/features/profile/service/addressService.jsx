import { API_BASE, getAuthHeaders } from "./apiConfig";

export async function updateAddresses(userId, addresses) {
  const res = await fetch(`${API_BASE}/users/${userId}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ addresses }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to save address");
  }

  return data.user;
}

export async function deleteAddress(userId) {
  return updateAddresses(userId, []);
}