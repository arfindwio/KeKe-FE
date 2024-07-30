import {
  reduxGetAllPromotions,
  reduxPostCreatePromotion,
  reduxPutEditPromotionById,
  reduxDeletePromotionById,
} from "../../../services/promotions/Promotions";
import {
  setPromotions,
  setPromotion,
  setPromotionsAdmin,
  setUpdatedPromotion,
  setDeletePromotion,
  startLoading,
  endLoading,
} from "../../reducer/promotions/PromotionsSlice";
import { handleRequestError } from "../../../utils/errorHandler";

export const getAllPromotionsAction = (query) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllPromotions(query);
    dispatch(setPromotions(result.data.data));
    return true;
  } catch (err) {
    console.error("Error without response:", err);
  } finally {
    dispatch(endLoading());
  }
};

export const getAllPromotionsAdminAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllPromotions("?limit=9999");
    dispatch(setPromotionsAdmin(result.data.data.promotions));
    return true;
  } catch (err) {
    console.error("Error without response:", err);
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
      const result = await reduxPutEditPromotionById(input, promotionId);
      dispatch(setUpdatedPromotion(result.data.data.updatedPromotion));
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
    const result = await reduxDeletePromotionById(promotionId);
    dispatch(setDeletePromotion(result.data.data.deletedPromotion));
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};
