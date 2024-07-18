import {
  reduxGetDiscussionsByProductId,
  reduxGetAllDiscussions,
  reduxPostCreateDiscussionByProductId,
  reduxDeleteDiscussionById,
} from "../../../services/discussions/Discussions";
import {
  setDiscussions,
  setDiscussionsAdmin,
  setDiscussion,
  startLoading,
  endLoading,
} from "../../reducer/discussions/DiscussionsSlice";
import { handleRequestError } from "../../../utils/errorHandler";

export const getAllDiscussionsAction = (query) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllDiscussions(query);
    dispatch(setDiscussionsAdmin(result.data.data));
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const getDiscussionsByProductIdAction =
  (productId, query) => async (dispatch) => {
    try {
      dispatch(startLoading());
      const result = await reduxGetDiscussionsByProductId(productId, query);
      dispatch(setDiscussions(result.data.data));
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
