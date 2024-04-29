// Service Login User
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxGetAllNotifications = async () => {
  return await http.get(`${API_ENDPOINT.NOTIFICATIONS}`);
};

export const reduxPostCreateNotification = async (input) => {
  return await http.post(`${API_ENDPOINT.NOTIFICATIONS}`, input);
};

export const reduxPutMarkAsReadNotifications = async () => {
  return await http.post(`${API_ENDPOINT.NOTIFICATIONS}/markAsRead`);
};
