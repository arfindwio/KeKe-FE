import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  discussions: [],
  discussion: null,
  loading: false,
};

const DiscussionsSlice = createSlice({
  name: "discussions",
  initialState,
  reducers: {
    setDiscussions: (state, action) => {
      state.discussions = action.payload;
    },
    setDiscussion: (state, action) => {
      state.discussion = action.payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { setDiscussions, setDiscussion, startLoading, endLoading } =
  DiscussionsSlice.actions;

export default DiscussionsSlice.reducer;
