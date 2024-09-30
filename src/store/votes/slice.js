import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  votes: [
    // { show_no: 0, user_id: 0, username: x,
    // song_Id: 0, title: x, artist x, like: 0, dislike: 0},
  ],
};

const votesSlice = createSlice({
  name: "votes",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.products = [];
    },
    votesFetched: (state, action) => {
      state.votes = [...state.votes, ...action.payload];
      state.loading = false;
      console.log("from slice votesfetched:", state.votes);
    },
    // setUserId: (state, action) => {
    //   state.userId = action.payload;
    //   //LocalStorage function______________________________
    //   localStorage.setItem("muziekRoute_userId", JSON.stringify(state.userId));
    // },
    // setUsername: (state, action) => {
    //   state.username = action.payload;
    //   //LocalStorage function______________________________
    //   localStorage.setItem("muziekRoute_username", state.username);
    // },
    // resetFavData: (state) => {
    //   state.favArray = [];
    //   //LocalStorage function______________________________
    //   localStorage.removeItem("muziekRoute_favData");
    // },
    // resetUserLoginData: (state, action) => {
    //   state.userId = null;
    //   state.username = null;
    //   //LocalStorage function______________________________
    //   localStorage.removeItem("muziekRoute_userId");
    //   localStorage.removeItem("muziekRoute_username");
    // },
    // addFav: (state, action) => {
    //   const songId = action.payload;
    //   const idArray = state.favArray.map((i) => {
    //     return i.id;
    //   });

    //   idArray.includes(songId)
    //     ? (state.favArray = state.favArray.map((fav) => {
    //         if (fav.id === songId) {
    //           return {
    //             ...fav,
    //             id: songId,
    //             like: 1,
    //             dislike: 0,
    //             color: "success",
    //           };
    //         } else {
    //           return { ...fav };
    //         }
    //       }))
    //     : state.favArray.push({
    //         id: songId,
    //         like: 1,
    //         dislike: 0,
    //         color: "success",
    //       });
    //   //LocalStorage function______________________________
    //   localStorage.setItem(
    //     "muziekRoute_favData",
    //     JSON.stringify(state.favArray)
    //   );
    // },
    // dislikeFav: (state, action) => {
    //   const songId = action.payload;
    //   const idArray = state.favArray.map((i) => {
    //     return i.id;
    //   });

    //   idArray.includes(songId)
    //     ? (state.favArray = state.favArray.map((fav) => {
    //         if (fav.id === songId) {
    //           return {
    //             ...fav,
    //             id: songId,
    //             like: 0,
    //             dislike: 1,
    //             color: "danger",
    //           };
    //         } else {
    //           return { ...fav };
    //         }
    //       }))
    //     : state.favArray.push({
    //         id: songId,
    //         like: 0,
    //         dislike: 1,
    //         color: "danger",
    //       });
    //   //LocalStorage function______________________________
    //   localStorage.setItem(
    //     "muziekRoute_favData",
    //     JSON.stringify(state.favArray)
    //   );
    // },
    // bootstrapUser: (state) => {
    //   const firstArray = state.favArray;
    //   !localStorage.muziekRoute_favData
    //     ? (state.favArray = firstArray)
    //     : (state.favArray = JSON.parse(
    //         localStorage.getItem("muziekRoute_favData")
    //       ));

    // },
  },
});

export const { startLoading, votesFetched } = votesSlice.actions;

export default votesSlice.reducer;
