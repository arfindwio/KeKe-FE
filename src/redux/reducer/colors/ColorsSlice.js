import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  colors: [],
  colorsByProductId: [],
  color: null,
  loading: false,
};

const ColorsSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {
    setColors: (state, action) => {
      state.colors = action.payload;
    },
    setColorsByProductId: (state, action) => {
      state.colorsByProductId = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
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
  setColors,
  setColorsByProductId,
  setColor,
  startLoading,
  endLoading,
} = ColorsSlice.actions;

export default ColorsSlice.reducer;
