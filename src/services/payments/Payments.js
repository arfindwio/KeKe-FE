// Service Login User
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllPayments = async (query) => {
  return await http.get(`${API_ENDPOINT.PAYMENTS}${query}`);
};

export const reduxPostCreatePaymentMidtrans = async (input) => {
  return await http.post(`${API_ENDPOINT.PAYMENTS}`, input);
};

export const reduxPutEditPaymentById = async (input, paymentId) => {
  return await http.put(`${API_ENDPOINT.PAYMENTS}/${paymentId}`, input);
};

export const reduxGetPaymentsHistory = async (query) => {
  return await http.get(`${API_ENDPOINT.PAYMENTS}/history${query}`);
};

export const reduxGetStatusMidtrans = async (orderId) => {
  return await http.get(`${API_ENDPOINT.PAYMENTS}/history/${orderId}`);
};
