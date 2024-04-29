// Service Login User
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetReviewsByProductId = async (productId) => {
  return await http.get(`${API_ENDPOINT.REVIEWS}/${productId}`);
};

export const reduxPostCreateReviewByProductId = async (input, productId) => {
  return await http.post(`${API_ENDPOINT.REVIEWS}/${productId}`, input);
};
