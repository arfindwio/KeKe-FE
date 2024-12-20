// Service Login User
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllCategories = async (query) => {
  return await http.get(`${API_ENDPOINT.CATEGORIES}${query}`);
};

export const reduxPostCreateCategory = async (input) => {
  return await http.post(`${API_ENDPOINT.CATEGORIES}`, input);
};

export const reduxPutEditCategoryById = async (input, categoryId) => {
  return await http.put(`${API_ENDPOINT.CATEGORIES}/${categoryId}`, input);
};

export const reduxDeleteCategoryById = async (categoryId) => {
  return await http.delete(`${API_ENDPOINT.CATEGORIES}/${categoryId}`);
};
