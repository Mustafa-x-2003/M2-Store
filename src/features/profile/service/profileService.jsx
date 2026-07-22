import { API_BASE, getAuthHeaders } from "./apiConfig";

export async function getCurrentUser() {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch user");
  }
  return data.user;
}

export async function updateProfile(userId, { username, phone, avatar }) {
  const res = await fetch(`${API_BASE}/users/${userId}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ username, phone, avatar }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to update profile");
  }

  return data.user;
}