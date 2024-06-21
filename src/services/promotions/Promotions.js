// Service Login User
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllPromotions = async () => {
  return await http.get(`${API_ENDPOINT.PROMOTIONS}`);
};
export const reduxGetAllPromotionsAdmin = async () => {
  return await http.get(`${API_ENDPOINT.PROMOTIONS}?limit=9999`);
};

export const reduxPostCreatePromotion = async (input) => {
  return await http.post(`${API_ENDPOINT.PROMOTIONS}`, input);
};

export const reduxPutEditPromotionById = async (input, promotionId) => {
  return await http.put(`${API_ENDPOINT.PROMOTIONS}/${promotionId}`, input);
};

export const reduxDeletePromotionById = async (promotionId) => {
  return await http.delete(`${API_ENDPOINT.PROMOTIONS}/${promotionId}`);
};
