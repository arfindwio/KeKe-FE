import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  userAuthenticate: null,
  loading: false,
};

const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUserAuthenticate: (state, action) => {
      state.userAuthenticate = action.payload;
    },
    resetUserAuth: (state) => {
      state.userAuthenticate = [];
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
  setUsers,
  setUserAuthenticate,
  resetUserAuth,
  startLoading,
  endLoading,
} = UsersSlice.actions;

export default UsersSlice.reducer;
