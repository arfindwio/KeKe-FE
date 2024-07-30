import {
  reduxGetAllSizes,
  reduxPostCreateSize,
  reduxGetSizesByProductId,
  reduxPutEditSizeById,
  reduxDeleteSizeById,
} from "../../../services/sizes/Sizes";
import {
  setSizes,
  setSizesByProductId,
  setSize,
  startLoading,
  endLoading,
} from "../../reducer/sizes/SizesSlice";
import { handleRequestError } from "../../../utils/errorHandler";

export const getAllSizesAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllSizes();
    dispatch(setSizes(result.data.data.sizes));
    return true;
  } catch (err) {
    console.error("Error without response:", err);
  } finally {
    dispatch(endLoading());
  }
};

export const postCreateSizeAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxPostCreateSize(input);
    return result.data.data.newSize;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const getSizesByProductIdAction = (productId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetSizesByProductId(productId);
    dispatch(setSizesByProductId(result.data.data.sizes));
    return true;
  } catch (err) {
    console.error("Error without response:", err);
  } finally {
    dispatch(endLoading());
  }
};

export const putEditSizeByIdAction = (input, sizeId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPutEditSizeById(input, sizeId);
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const deleteSizeByIdAction = (sizeId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxDeleteSizeById(sizeId);
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};
