import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  categoriesAdmin: [],
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
    setCategoriesAdmin: (state, action) => {
      state.categoriesAdmin = action.payload;
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

export const {
  setCategories,
  setCategoriesAdmin,
  setCategory,
  startLoading,
  endLoading,
} = CategoriesSlice.actions;

export default CategoriesSlice.reducer;
