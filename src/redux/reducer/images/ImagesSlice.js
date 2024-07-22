import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [],
  image: null,
  loading: false,
};

const ImagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { setImages, setImage, startLoading, endLoading } =
  ImagesSlice.actions;

export default ImagesSlice.reducer;
