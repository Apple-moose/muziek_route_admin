import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  votes: [
    //Array Elements: { show_no: 0, user_id: 0, username: x,
    // song_Id: 0, title: x, artist x, like: 0, dislike: 0},
  ],
};

const votesSlice = createSlice({
  name: "votes",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.votes = [];
    },
    votesFetched: (state, action) => {
      state.votes = [...state.votes, ...action.payload];
      state.loading = false;
      // console.log("from slice votesfetched:", state.votes);
    },
  },
});

export const { startLoading, votesFetched } = votesSlice.actions;

export default votesSlice.reducer;
