import { showErrorToast } from "../../../helper/ToastHelper";
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

export const getAllSizesAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllSizes();
    dispatch(setSizes(result.data.data.sizes));
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

export const postCreateSizeAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPostCreateSize(input);
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

export const getSizesByProductIdAction = (productId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetSizesByProductId(productId);
    dispatch(setSizesByProductId(result.data.data.sizes));
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

export const putEditSizeByIdAction = (input, sizeId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPutEditSizeById(input, sizeId);
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

export const deleteSizeByIdAction = (sizeId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxDeleteSizeById(sizeId);
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
