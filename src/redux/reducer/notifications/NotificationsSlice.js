import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  notification: null,
  loading: false,
};

const NotificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { setNotifications, setNotification, startLoading, endLoading } =
  NotificationsSlice.actions;

export default NotificationsSlice.reducer;
