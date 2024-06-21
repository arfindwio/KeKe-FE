import {
  reduxGetAllPromotions,
  reduxPostCreatePromotion,
  reduxGetAllPromotionsAdmin,
  reduxPutEditPromotionById,
  reduxDeletePromotionById,
} from "../../../services/promotions/Promotions";
import {
  setPromotions,
  setPromotionsAdmin,
  setPromotion,
  startLoading,
  endLoading,
} from "../../reducer/promotions/PromotionsSlice";
import { handleRequestError } from "../../../utils/errorHandler";

export const getAllPromotionsAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllPromotions();
    dispatch(setPromotions(result.data.data.promotions));
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const getAllPromotionsAdminAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllPromotionsAdmin();
    dispatch(setPromotionsAdmin(result.data.data.promotions));
    return true;
  } catch (err) {
    handleRequestError(err);
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
    handleRequestError(err);
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
      handleRequestError(err);
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
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};
