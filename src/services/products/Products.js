// Service Login User
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllProducts = async (query) => {
  return await http.get(`${API_ENDPOINT.PRODUCTS}${query}`);
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

export const reduxGetProductsRecommendation = async () => {
  return await http.get(`${API_ENDPOINT.PRODUCTS}/featured/recommendation`);
};

export const reduxGetProductsUserRecommendation = async () => {
  return await http.get(
    `${API_ENDPOINT.PRODUCTS}/featured/recommendation-user`,
  );
};

export const reduxGetSpecialOfferProduct = async () => {
  return await http.get(`${API_ENDPOINT.PRODUCTS}/featured/specialOffer`);
};
