// Service Login User
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "../../utils/http";

export const reduxPostCreateReplyByDiscussionId = async (
  input,
  discussionId,
) => {
  return await http.post(`${API_ENDPOINT.REPLIES}/${discussionId}`, input);
};

export const reduxDeleteReplyById = async (replyId) => {
  return await http.delete(`${API_ENDPOINT.REPLIES}/${replyId}`);
};
