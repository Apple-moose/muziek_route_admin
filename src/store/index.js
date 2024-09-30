import { configureStore } from "@reduxjs/toolkit";
import votesReducer from "./votes/slice";

const store = configureStore({
  reducer: {
    votes: votesReducer,
  },
});
export default store;
