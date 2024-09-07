// Service Login User
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxPostRegisterUser = async (input) => {
  return await http.post(`${API_ENDPOINT.USERS}/register`, input);
};

export const reduxPostLoginUser = async (input) => {
  return await http.post(`${API_ENDPOINT.USERS}/login`, input);
};

export const reduxPutOtpUser = async (input) => {
  return await http.put(`${API_ENDPOINT.USERS}/verify-otp`, input);
};

export const reduxPutResendOtpUser = async (input) => {
  return await http.put(`${API_ENDPOINT.USERS}/resend-otp`, input);
};

export const reduxPostForgetPassword = async (input) => {
  return await http.post(`${API_ENDPOINT.USERS}/forget-password`, input);
};

export const reduxGetUserByAuth = async () => {
  return await http.get(`${API_ENDPOINT.USERS}/authenticate`);
};

export const reduxPutChangePassword = (input) => {
  return http.put(`${API_ENDPOINT.USERS}/change-password`, input);
};

export const reduxGetAllUsers = async (query) => {
  return await http.get(`${API_ENDPOINT.USERS}${query}`);
};
export const reduxPutChangeRoleUser = async (input, userId) => {
  return await http.put(`${API_ENDPOINT.USERS}/role/${userId}`, input);
};

export const reduxPutUpdatePassword = async (input, token) => {
  return await http.put(`${API_ENDPOINT.USERS}?token=${token}`, input);
};
