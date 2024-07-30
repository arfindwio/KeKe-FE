import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: null,
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
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setCategoriesAdmin: (state, action) => {
      state.categoriesAdmin = action.payload;
    },
    setUpdatedCategory: (state, action) => {
      const updatedCategory = action.payload;
      state.categories.categories = state.categories.categories.map(
        (category) =>
          category.id === updatedCategory.id ? updatedCategory : category,
      );
    },
    setDeletedCategory: (state, action) => {
      const deletedCategory = action.payload;
      state.categories.categories = state.categories.categories.map(
        (category) =>
          category.id === deletedCategory.id ? deletedCategory : category,
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
  setCategories,
  setCategory,
  setCategoriesAdmin,
  setUpdatedCategory,
  setDeletedCategory,
  startLoading,
  endLoading,
} = CategoriesSlice.actions;

export default CategoriesSlice.reducer;
