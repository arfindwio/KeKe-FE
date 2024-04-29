import { showErrorToast } from "../../../helper/ToastHelper";
import {
  reduxGetAllPromotions,
  reduxPostCreatePromotion,
  reduxPutEditPromotionById,
  reduxDeletePromotionById,
} from "../../../services/promotions/Promotions";
import {
  setPromotions,
  setPromotion,
  startLoading,
  endLoading,
} from "../../reducer/promotions/PromotionsSlice";

export const getAllPromotionsAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllPromotions();
    dispatch(setPromotions(result.data.data.promotions));
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

export const postCreatePromotionAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPostCreatePromotion(input);
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

export const putEditPromotionByIdAction =
  (input, promotionId) => async (dispatch) => {
    try {
      dispatch(startLoading());
      await reduxPutEditPromotionById(input, promotionId);
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

export const deletePromotionByIdAction = (promotionId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxDeletePromotionById(promotionId);
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
