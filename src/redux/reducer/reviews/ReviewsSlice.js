import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  review: null,
  loading: false,
};

const ReviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
    setReview: (state, action) => {
      state.review = action.payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { setReviews, setReview, startLoading, endLoading } =
  ReviewsSlice.actions;

export default ReviewsSlice.reducer;
