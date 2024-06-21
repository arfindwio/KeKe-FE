import {
  reduxGetAllCategories,
  reduxGetAllCategoriesAdmin,
  reduxPostCreateCategory,
  reduxPutEditCategoryById,
  reduxDeleteCategoryById,
} from "../../../services/categories/Categories";
import {
  setCategories,
  setCategoriesAdmin,
  setCategory,
  startLoading,
  endLoading,
} from "../../reducer/categories/CategoriesSlice";
import { handleRequestError } from "../../../utils/errorHandler";

export const getAllCategoriesAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllCategories();
    dispatch(setCategories(result.data.data.categories));
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const getAllCategoriesAdminAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllCategoriesAdmin();
    dispatch(setCategoriesAdmin(result.data.data.categories));
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const postCreateCategoryAction = (formData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { image, categoryName } = formData;

    const formDataObject = new FormData();
    formDataObject.append("image", image || "");
    formDataObject.append("categoryName", categoryName);
    await reduxPostCreateCategory(formDataObject);
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const putEditCategoryByIdAction =
  (formData, categoryId) => async (dispatch) => {
    try {
      dispatch(startLoading());
      await reduxPutEditCategoryById(formData, categoryId);
      return true;
    } catch (err) {
      handleRequestError(err);
    } finally {
      dispatch(endLoading());
    }
  };

export const deleteCategoryByIdAction = (categoryId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxDeleteCategoryById(categoryId);
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};
