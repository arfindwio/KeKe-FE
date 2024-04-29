import { showErrorToast } from "../../../helper/ToastHelper";
import {
  reduxGetDiscussionsByProductId,
  reduxPostCreateDiscussionByProductId,
  reduxDeleteDiscussionById,
} from "../../../services/discussions/Discussions";
import {
  setDiscussions,
  setDiscussion,
  startLoading,
  endLoading,
} from "../../reducer/discussions/DiscussionsSlice";

export const getDiscussionsByProductIdAction =
  (productId) => async (dispatch) => {
    try {
      dispatch(startLoading());
      const result = await reduxGetDiscussionsByProductId(productId);
      dispatch(setDiscussions(result.data.data.discussions));
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

export const postCreateDiscussionByProductIdAction =
  (input, productId) => async (dispatch) => {
    try {
      dispatch(startLoading());
      await reduxPostCreateDiscussionByProductId(input, productId);
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

export const deleteDiscussionByIdAction =
  (discussionId) => async (dispatch) => {
    try {
      dispatch(startLoading());
      await reduxDeleteDiscussionById(discussionId);
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
