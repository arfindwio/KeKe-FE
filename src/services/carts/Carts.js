// Service Login User
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllCartsByAuth = async () => {
  return await http.get(`${API_ENDPOINT.CARTS}`);
};

export const reduxPostCreateCartByProductId = async (input, productId) => {
  return await http.post(`${API_ENDPOINT.CARTS}/${productId}`, input);
};

export const reduxPutEditCartById = async (input, cartId) => {
  return await http.put(`${API_ENDPOINT.CARTS}/${cartId}`, input);
};

export const reduxDeleteCartById = async (cartId) => {
  return await http.delete(`${API_ENDPOINT.CARTS}/${cartId}`);
};
