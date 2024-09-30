import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  me: null,
  userId: null,
  userData: [],
  accessToken: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    getToken: (state, action) => {
      state.loading = false;
      state.accessToken = action.payload;
    },
    userLoggedIn: (state, action) => {
      state.loading = false;
      state.me = action.payload;
      localStorage.setItem("userName", state.me);
    },
    getUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", state.userId);
    },
    getUserData: (state, action) => {
      state.userData = action.payload;
    },
    userLogOut: (state) => {
      localStorage.removeItem("tokenReceived");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      state.me = null;
      state.userId = null;
      state.userData = [];
      state.accessToken = null;
    },
  },
});

export const {
  startLoading,
  getToken,
  getUserId,
  getUserData,
  userLoggedIn,
  userLogOut,
} = authSlice.actions;

export default authSlice.reducer;
