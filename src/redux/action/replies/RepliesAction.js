import { showErrorToast } from "../../../helper/ToastHelper";
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

export const postCreateReplyByDiscussionIdAction =
  (input, discussionId) => async (dispatch) => {
    try {
      dispatch(startLoading());
      await reduxPostCreateReplyByDiscussionId(input, discussionId);
      return true;
    } catch (err) {
      if (err.response) {
        if (err.response.status >= 400 && err.response.status <= 500) {
          showErrorToast(err.response.data.message);
        } else {
          console.error("unexpected Error", err);
        }
      }
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
    if (err.response) {
      if (err.response.status >= 400 && err.response.status <= 500) {
        showErrorToast(err.response.data.message);
      } else {
        console.error("unexpected Error", err);
      }
    }
  } finally {
    dispatch(endLoading());
  }
};
