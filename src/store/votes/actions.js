import axios from "axios";
import { startLoading, votesFetched } from "./slice";
// import { bootstrapUser } from "../user/slice";
// import { bootstrapBank } from "../bank/slice";

const API_URL = `http://localhost:8000`;
// const API_URL = `https://webshop-api-sr7l.onrender.com`;

export const fetchVotes = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const response = await axios.get(`${API_URL}/votes`);
      const votes = response.data;
      await Promise.all([
        dispatch(votesFetched(votes)),
        //localStorage functions___________________________
        // dispatch(bootstrapUser()),
        // dispatch(bootstrapBank()),
      ]);
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  };
};
