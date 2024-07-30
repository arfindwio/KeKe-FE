import {
  reduxGetAllCartsByAuth,
  reduxPostCreateCartByProductId,
  reduxPutEditCartById,
  reduxDeleteCartById,
} from "../../../services/carts/Carts";
import {
  setCarts,
  setCart,
  startLoading,
  endLoading,
} from "../../reducer/carts/CartsSlice";
import { handleRequestError } from "../../../utils/errorHandler";

export const getAllCartsByAuthAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllCartsByAuth();
    dispatch(setCarts(result.data.data.carts));
    return true;
  } catch (err) {
    console.error("Error without response:", err);
  } finally {
    dispatch(endLoading());
  }
};

export const postCreateCartByProductIdAction =
  (input, productId) => async (dispatch) => {
    try {
      dispatch(startLoading());
      await reduxPostCreateCartByProductId(input, productId);
      return true;
    } catch (err) {
      handleRequestError(err);
    } finally {
      dispatch(endLoading());
    }
  };

export const putEditCartByIdAction = (input, cartId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPutEditCartById(input, cartId);
    return true;
  } catch (err) {
    handleRequestError(err);
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
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};
