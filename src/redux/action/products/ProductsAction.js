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
    dispatch(setProducts(result.data.data.products));
    return true;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const getAllProductsAdminAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const result = await reduxGetAllProducts("?limit=9999");
    dispatch(setProductsAdmin(result.data.data.products));
    return true;
  } catch (err) {
    handleRequestError(err);
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
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const postCreateProductAction = (formData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const {
      image,
      productName,
      price,
      description,
      stock,
      categoryId,
      promotionId,
    } = formData;

    const formDataObject = new FormData();
    formDataObject.append("image", image || "");
    formDataObject.append("productName", productName);
    formDataObject.append("price", price);
    formDataObject.append("description", description);
    formDataObject.append("stock", stock);
    formDataObject.append("categoryId", categoryId);
    formDataObject.append("promotionId", promotionId);

    const result = await reduxPostCreateProduct(formDataObject);
    return result.data.data.newProduct;
  } catch (err) {
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};

export const putEditProductByIdAction =
  (formData, productId) => async (dispatch) => {
    try {
      dispatch(startLoading());

      const {
        image,
        productName,
        price,
        description,
        stock,
        categoryId,
        promotionId,
      } = formData;

      const formDataObject = new FormData();
      formDataObject.append("image", image || "");
      formDataObject.append("productName", productName);
      formDataObject.append("price", price);
      formDataObject.append("description", description);
      formDataObject.append("stock", stock);
      formDataObject.append("categoryId", categoryId);
      formDataObject.append("promotionId", promotionId);

      const result = await reduxPutEditProductById(formDataObject, productId);

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
    handleRequestError(err);
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
    handleRequestError(err);
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
    handleRequestError(err);
  } finally {
    dispatch(endLoading());
  }
};
