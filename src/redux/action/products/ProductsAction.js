import { showErrorToast } from "../../../helper/ToastHelper";
import {
  reduxGetAllProducts,
  reduxGetProductById,
  reduxPostCreateProduct,
  reduxPutEditProductById,
  reduxDeleteProductById,
} from "../../../services/products/Products";
import {
  setProducts,
  setProduct,
  startLoading,
  endLoading,
} from "../../reducer/products/ProductsSlice";

export const getAllProductsAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllProducts();
    dispatch(setProducts(result.data.data.products));
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

export const getProductByIdAction = (productId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetProductById(productId);
    dispatch(setProduct(result.data.data.product));
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

export const postCreateProductAction = (formData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxPostCreateProduct(formData);
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

export const putEditProductByIdAction =
  (formData, productId) => async (dispatch) => {
    try {
      dispatch(startLoading());
      await reduxPutEditProductById(formData, productId);
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

export const deleteProductByIdAction = (productId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await reduxDeleteProductById(productId);
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
