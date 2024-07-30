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

export const getReviewsByProductIdAction =
  (productId, query) => async (dispatch) => {
    try {
      dispatch(startLoading());
      const result = await reduxGetReviewsByProductId(productId, query);
      dispatch(setReviews(result.data.data));
      return true;
    } catch (err) {
      console.error("Error without response:", err);
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
