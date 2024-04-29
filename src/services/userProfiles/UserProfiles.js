// services/user/auth/UpdateProfile
import http from "../../utils/http";
import { API_ENDPOINT } from "../../utils/api-endpoint";

export const reduxUpdateUserProfile = async (input) => {
  return http.put(`${API_ENDPOINT.USER_PROFILES}/update-profile`, input);
};
