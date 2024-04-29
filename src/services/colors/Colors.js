// Service Login User
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllColors = async () => {
  return await http.get(`${API_ENDPOINT.COLORS}`);
};

export const reduxPostCreateColor = async (input) => {
  return await http.post(`${API_ENDPOINT.COLORS}`, input);
};

export const reduxGetColorsByProductId = async (productId) => {
  return await http.get(`${API_ENDPOINT.COLORS}/${productId}`);
};

export const reduxPutEditColorById = async (input, colorId) => {
  return await http.put(`${API_ENDPOINT.COLORS}/${colorId}`, input);
};

export const reduxDeleteColorById = async (colorId) => {
  return await http.delete(`${API_ENDPOINT.COLORS}/${colorId}`);
};
