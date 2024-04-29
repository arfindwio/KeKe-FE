import { showErrorToast } from "../../../helper/ToastHelper";
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

export const getReviewsByProductIdAction = (productId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetReviewsByProductId(productId);
    dispatch(setReviews(result.data.data.reviews));
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

export const postCreateReviewByProductIdAction =
  (input, productId) => async (dispatch) => {
    try {
      dispatch(startLoading());
      await reduxPostCreateReviewByProductId(input, productId);
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
