import {
  reduxGetAllProducts,
  reduxGetProductById,
  reduxPostCreateProduct,
  reduxPutEditProductById,
  reduxDeleteProductById,
  reduxGetProductsRecommendation,
  reduxGetProductsUserRecommendation,
  reduxGetSpecialOfferProduct,
} from "../../../services/products/Products";
import {
  setProducts,
  setProductsAdmin,
  setRecommendationProducts,
  resetSpecialOfferProduct,
  setProduct,
  setSpecialOfferProduct,
  startLoading,
  endLoading,
} from "../../reducer/products/ProductsSlice";
import { handleRequestError } from "../../../utils/errorHandler";

export const getAllProductsAction = (query) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllProducts(query);
    dispatch(setProducts(result.data.data));
    return true;
  } catch (err) {
    console.error("Error without response:", err);
  } finally {
    dispatch(endLoading());
  }
};

export const getProductByIdAction = (productId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetProductById(productId);
    dispatch(setProduct(result.data.data.product));
    return result.data.data.product;
  } catch (err) {
    console.error("Error without response:", err);
  } finally {
    dispatch(endLoading());
  }
};

export const postCreateProductAction = (input) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const result = await reduxPostCreateProduct(input);
    return result.data.data.newProduct;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const putEditProductByIdAction =
  (input, productId) => async (dispatch) => {
    try {
      dispatch(startLoading());

      const result = await reduxPutEditProductById(input, productId);

      return result.data.data.editedProduct;
    } catch (err) {
      handleRequestError(err);
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
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const getRecommendationProductsAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetProductsRecommendation();
    dispatch(setRecommendationProducts(result.data.data.products));
    return true;
  } catch (err) {
    console.error("Error without response:", err);
  } finally {
    dispatch(endLoading());
  }
};

export const getRecommendationProductsActionUser = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetProductsUserRecommendation();
    dispatch(setRecommendationProducts(result.data.data.products));
    return true;
  } catch (err) {
    console.error("Error without response:", err);
  } finally {
    dispatch(endLoading());
  }
};

export const getSpecialOfferProductAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetSpecialOfferProduct();
    dispatch(setSpecialOfferProduct(result.data.data.product));
    return true;
  } catch (err) {
    dispatch(resetSpecialOfferProduct());
  } finally {
    dispatch(endLoading());
  }
};
