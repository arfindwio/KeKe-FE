import {
  reduxGetAllColors,
  reduxPostCreateColor,
  reduxGetColorsByProductId,
  reduxPutEditColorById,
  reduxDeleteColorById,
} from "../../../services/colors/Colors";
import {
  setColors,
  setColorsByProductId,
  setColor,
  startLoading,
  endLoading,
} from "../../reducer/colors/ColorsSlice";
import { handleRequestError } from "../../../utils/errorHandler";

export const getAllColorsAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllColors();
    dispatch(setColors(result.data.data.colors));
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const postCreateColorAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPostCreateColor(input);
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const getColorsByProductIdAction = (productId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetColorsByProductId(productId);
    dispatch(setColorsByProductId(result.data.data.colors));
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const putEditColorByIdAction = (input, colorId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPutEditColorById(input, colorId);
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const deleteColorByIdAction = (colorId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxDeleteColorById(colorId);
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};
