import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  replies: [],
  reply: null,
  loading: false,
};

const RepliesSlice = createSlice({
  name: "replies",
  initialState,
  reducers: {
    setReplies: (state, action) => {
      state.replies = action.payload;
    },
    setReply: (state, action) => {
      state.reply = action.payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { setReplies, setReply, startLoading, endLoading } =
  RepliesSlice.actions;

export default RepliesSlice.reducer;
