import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  cart: null,
  loading: false,
};

const CartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    setCarts: (state, action) => {
      state.carts = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    resetCart: () => initialState,
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { setCarts, setCart, resetCart, startLoading, endLoading } =
  CartsSlice.actions;

export default CartsSlice.reducer;
