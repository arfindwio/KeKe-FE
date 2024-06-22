import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  promotions: [],
  promotionsAdmin: [],
  promotion: null,
  loading: false,
};

const PromotionsSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {
    setPromotions: (state, action) => {
      state.promotions = action.payload;
    },
    setPromotionsAdmin: (state, action) => {
      state.promotionsAdmin = action.payload;
    },
    setPromotion: (state, action) => {
      state.promotion = action.payload;
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
  setPromotions,
  setPromotionsAdmin,
  setPromotion,
  startLoading,
  endLoading,
} = PromotionsSlice.actions;

export default PromotionsSlice.reducer;
