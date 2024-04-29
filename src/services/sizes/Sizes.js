// Service Login User
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllSizes = async () => {
  return await http.get(`${API_ENDPOINT.SIZES}`);
};

export const reduxPostCreateSize = async (input) => {
  return await http.post(`${API_ENDPOINT.SIZES}`, input);
};

export const reduxGetSizesByProductId = async (productId) => {
  return await http.get(`${API_ENDPOINT.SIZES}/${productId}`);
};

export const reduxPutEditSizeById = async (input, sizeId) => {
  return await http.put(`${API_ENDPOINT.SIZES}/${sizeId}`, input);
};

export const reduxDeleteSizeById = async (sizeId) => {
  return await http.delete(`${API_ENDPOINT.SIZES}/${sizeId}`);
};
