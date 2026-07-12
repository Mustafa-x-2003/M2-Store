import axios from "axios";

const API_URL = "https://e-commerce-api-3wara.vercel.app";

export const sendRegisterOtp = async (userData) => {
  const response = await axios.post(
    `${API_URL}/auth/register/send-otp`,
    userData,
  );

  return response.data;
};

export const verifyRegisterOtp = async (verificationData) => {
  const response = await axios.post(
    `${API_URL}/auth/register/verify-otp`,
    verificationData,
  );

  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);

  return response.data;
};

export const sendForgotPasswordOtp = async (emailData) => {
  const response = await axios.post(
    `${API_URL}/auth/forgot-password/send-otp`,
    emailData,
  );

  return response.data;
};

export const verifyForgotPasswordOtp = async (resetData) => {
  const response = await axios.post(
    `${API_URL}/auth/forgot-password/verify-otp`,
    resetData,
  );

  return response.data;
};

export const getCurrentUser = async (token) => {
  const response = await axios.get(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};