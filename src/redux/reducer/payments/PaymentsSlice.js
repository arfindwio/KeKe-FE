import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: [],
  paymentsHistory: [],
  payment: null,
  loading: false,
};

const PaymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
    setPaymentsHistory: (state, action) => {
      state.paymentsHistory = action.payload;
    },
    setPayment: (state, action) => {
      state.payment = action.payload;
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
  setPayments,
  setPaymentsHistory,
  setPayment,
  startLoading,
  endLoading,
} = PaymentsSlice.actions;

export default PaymentsSlice.reducer;
