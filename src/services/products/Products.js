// Service Login User
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllProducts = async () => {
  return await http.get(`${API_ENDPOINT.PRODUCTS}`);
};

export const reduxPostCreateProduct = async (input) => {
  return await http.post(`${API_ENDPOINT.PRODUCTS}`, input);
};

export const reduxGetProductById = async (productId) => {
  return await http.get(`${API_ENDPOINT.PRODUCTS}/${productId}`);
};

export const reduxPutEditProductById = async (input, productId) => {
  return await http.put(`${API_ENDPOINT.PRODUCTS}/${productId}`, input);
};

export const reduxDeleteProductById = async (productId) => {
  return await http.delete(`${API_ENDPOINT.PRODUCTS}/${productId}`);
};
