import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sizes: [],
  sizesByProductId: [],
  size: null,
  loading: false,
};

const SizesSlice = createSlice({
  name: "sizes",
  initialState,
  reducers: {
    setSizes: (state, action) => {
      state.sizes = action.payload;
    },
    setSizesByProductId: (state, action) => {
      state.sizesByProductId = action.payload;
    },
    setSize: (state, action) => {
      state.size = action.payload;
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
  setSizes,
  setSizesByProductId,
  setSize,
  startLoading,
  endLoading,
} = SizesSlice.actions;

export default SizesSlice.reducer;
