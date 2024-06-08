import {
  reduxPostCreateReplyByDiscussionId,
  reduxDeleteReplyById,
} from "../../../services/replies/Replies";
import {
  setReplies,
  setReply,
  startLoading,
  endLoading,
} from "../../reducer/replies/RepliesSlice";
import { handleRequestError } from "../../../utils/errorHandler";

export const postCreateReplyByDiscussionIdAction =
  (input, discussionId) => async (dispatch) => {
    try {
      dispatch(startLoading());
      await reduxPostCreateReplyByDiscussionId(input, discussionId);
      return true;
    } catch (err) {
      handleRequestError(err);
    } finally {
      dispatch(endLoading());
    }
  };

export const deleteReplyByIdAction = (replyId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxDeleteReplyById(replyId);
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};
