import {
  reduxGetReviewsByProductId,
  reduxPostCreateReviewByProductId,
} from "../../../services/reviews/Reviews";
import {
  setReviews,
  setReview,
  startLoading,
  endLoading,
} from "../../reducer/reviews/ReviewsSlice";
import { handleRequestError } from "../../../utils/errorHandler";

export const getReviewsByProductIdAction = (productId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetReviewsByProductId(productId);
    dispatch(setReviews(result.data.data.reviews));
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const postCreateReviewByProductIdAction =
  (input, productId) => async (dispatch) => {
    try {
      dispatch(startLoading());
      await reduxPostCreateReviewByProductId(input, productId);
      return true;
    } catch (err) {
      handleRequestError(err);
    } finally {
      dispatch(endLoading());
    }
  };
