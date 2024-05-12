import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  recommendationProducts: [],
  product: null,
  specialOfferProduct: null,
  loading: false,
};

const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setRecommendationProducts: (state, action) => {
      state.recommendationProducts = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setSpecialOfferProduct: (state, action) => {
      state.specialOfferProduct = action.payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
  },
});

export const {
  setProducts,
  setRecommendationProducts,
  setProduct,
  setSpecialOfferProduct,
  startLoading,
  endLoading,
} = ProductsSlice.actions;

export default ProductsSlice.reducer;
