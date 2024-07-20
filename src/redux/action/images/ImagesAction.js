import {
  reduxPostCreateImage,
  reduxPutEditImageById,
  reduxDeleteImageById,
} from "../../../services/images/Images";
import {
  setImages,
  setImage,
  startLoading,
  endLoading,
} from "../../reducer/images/ImagesSlice";
import { handleRequestError } from "../../../utils/errorHandler";

export const postCreateImageAction = (formData) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const { image, categoryId, productId } = formData;

    const formDataObject = new FormData();
    formDataObject.append("image", image || "");
    formDataObject.append("categoryId", categoryId);
    formDataObject.append("productId", productId);
    await reduxPostCreateImage(formDataObject);

    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const putEditImageByIdAction =
  (formData, imageId) => async (dispatch) => {
    try {
      dispatch(startLoading());

      const { image, categoryId, productId } = formData;

      const formDataObject = new FormData();
      formDataObject.append("image", image || "");
      formDataObject.append("categoryId", categoryId);
      formDataObject.append("productId", productId);
      await reduxPutEditImageById(formDataObject, imageId);

      return true;
    } catch (err) {
      handleRequestError(err);
    } finally {
      dispatch(endLoading());
    }
  };

export const deleteImageByIdAction = (imageId) => async (dispatch) => {
  try {
    dispatch(startLoading());

    await reduxDeleteImageById(imageId);

    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};
