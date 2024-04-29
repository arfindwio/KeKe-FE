import { showErrorToast } from "../../../helper/ToastHelper";
import {
  reduxGetAllCartsByAuth,
  reduxPostCreateCartByProductId,
  reduxPutEditCartById,
  reduxDeleteCartById,
} from "../../../services/carts/Carts";
import {
  setCategories,
  setCategory,
  startLoading,
  endLoading,
} from "../../reducer/carts/CartsSlice";

export const getAllCartsByAuthAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllCartsByAuth();
    dispatch(setCategories(result.data.data.carts));
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

export const postCreateCartByProductIdAction =
  (productId) => async (dispatch) => {
    try {
      dispatch(startLoading());
      await reduxPostCreateCartByProductId(productId);
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

export const putEditCartByIdAction = (input, productId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPutEditCartById(input, productId);
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

export const deleteCartByIdAction = (productId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxDeleteCartById(productId);
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
