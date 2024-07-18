import {
  reduxGetAllCategories,
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

export const getAllCategoriesAction = (query) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllCategories(query);
    dispatch(setCategories(result.data.data));
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
    const result = await reduxGetAllCategories("?limit=9999");
    dispatch(setCategoriesAdmin(result.data.data.categories));
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const postCreateCategoryAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxPostCreateCategory(input);

    return result.data.data.newCategory;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const putEditCategoryByIdAction =
  (input, categoryId) => async (dispatch) => {
    try {
      dispatch(startLoading());

      const result = await reduxPutEditCategoryById(input, categoryId);

      return result.data.data.editedCategory;
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
