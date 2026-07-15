import { API_BASE, getAuthHeaders } from "./apiConfig";

export async function sendPasswordResetOtp(email) {
  const res = await fetch(`${API_BASE}/auth/forgot-password/send-otp`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to send OTP");
  }
  return data;
}
export async function resetPassword(email, otp, newPassword) {
  const res = await fetch(`${API_BASE}/auth/forgot-password/verify-otp`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ email, otp, newPassword }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to reset password");
  }
  return data;
}