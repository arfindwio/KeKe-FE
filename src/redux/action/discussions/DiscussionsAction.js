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
import { handleRequestError } from "../../../utils/errorHandler";

export const getDiscussionsByProductIdAction =
  (productId) => async (dispatch) => {
    try {
      dispatch(startLoading());
      const result = await reduxGetDiscussionsByProductId(productId);
      dispatch(setDiscussions(result.data.data.discussions));
      return true;
    } catch (err) {
      handleRequestError(err);
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
      handleRequestError(err);
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
      handleRequestError(err);
    } finally {
      dispatch(endLoading());
    }
  };
