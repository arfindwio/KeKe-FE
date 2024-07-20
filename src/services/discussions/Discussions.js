// Service Login User
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllDiscussions = async (query) => {
  return await http.get(`${API_ENDPOINT.DISCUSSIONS}${query}`);
};

export const reduxGetDiscussionsByProductId = async (productId, query) => {
  return await http.get(`${API_ENDPOINT.DISCUSSIONS}/${productId}${query}`);
};

export const reduxPostCreateDiscussionByProductId = async (
  input,
  productId,
) => {
  return await http.post(`${API_ENDPOINT.DISCUSSIONS}/${productId}`, input);
};

export const reduxDeleteDiscussionById = async (discussionId) => {
  return await http.delete(`${API_ENDPOINT.DISCUSSIONS}/${discussionId}`);
};
