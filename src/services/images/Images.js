// Service Login User
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxPostCreateImage = async (input) => {
  return await http.post(`${API_ENDPOINT.IMAGES}`, input);
};

export const reduxPutEditImageById = async (input, imageId) => {
  return await http.put(`${API_ENDPOINT.IMAGES}/${imageId}`, input);
};

export const reduxDeleteImageById = async (imageId) => {
  return await http.delete(`${API_ENDPOINT.IMAGES}/${imageId}`);
};
