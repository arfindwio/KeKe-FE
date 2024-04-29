import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  category: null,
  loading: false,
};

const CategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { setCategories, setCategory, startLoading, endLoading } =
  CategoriesSlice.actions;

export default CategoriesSlice.reducer;
