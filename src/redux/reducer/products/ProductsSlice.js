import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
  product: null,
  filterProduct: null,
  recommendationProducts: [],
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
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setFilterProduct: (state, action) => {
      state.filterProduct = action.payload;
    },
    setRecommendationProducts: (state, action) => {
      state.recommendationProducts = action.payload;
    },
    setSpecialOfferProduct: (state, action) => {
      state.specialOfferProduct = action.payload;
    },
    resetSpecialOfferProduct: (state) => {
      state.specialOfferProduct = null;
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
  setProduct,
  setFilterProduct,
  setRecommendationProducts,
  setSpecialOfferProduct,
  resetSpecialOfferProduct,
  startLoading,
  endLoading,
} = ProductsSlice.actions;

export default ProductsSlice.reducer;
