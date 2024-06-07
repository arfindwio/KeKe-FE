import { showErrorToast } from "../../../helper/ToastHelper";
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

export const getAllCategoriesAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllCategories();
    dispatch(setCategories(result.data.data.categories));
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

export const getAllCategoriesAdminAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllCategoriesAdmin();
    dispatch(setCategoriesAdmin(result.data.data.categories));
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

export const postCreateCategoryAction = (formData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPostCreateCategory(formData);
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

export const putEditCategoryByIdAction =
  (formData, categoryId) => async (dispatch) => {
    try {
      dispatch(startLoading());
      await reduxPutEditCategoryById(formData, categoryId);
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

export const deleteCategoryByIdAction = (categoryId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxDeleteCategoryById(categoryId);
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
