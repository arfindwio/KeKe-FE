import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  promotions: null,
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
    setPromotion: (state, action) => {
      state.promotion = action.payload;
    },
    setPromotionsAdmin: (state, action) => {
      state.promotionsAdmin = action.payload;
    },
    setUpdatedPromotion: (state, action) => {
      const updatedPromotion = action.payload;
      state.promotions.promotions = state.promotions.promotions.map((promo) =>
        promo.id === updatedPromotion.id ? updatedPromotion : promo,
      );
    },
    setDeletePromotion: (state, action) => {
      const deletedPromotion = action.payload;
      state.promotions.promotions = state.promotions.promotions.filter(
        (promo) => promo.id !== deletedPromotion.id,
      );
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
  setPromotion,
  setPromotionsAdmin,
  setUpdatedPromotion,
  setDeletePromotion,
  startLoading,
  endLoading,
} = PromotionsSlice.actions;

export default PromotionsSlice.reducer;
