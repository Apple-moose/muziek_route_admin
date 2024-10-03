import { createSelector } from "reselect";

export const selectVotesState = (reduxState) => reduxState.votes.votes;

export const selectVotes = selectVotesState;

export const selectFilteredVotes = (show_no) =>
  createSelector([selectVotesState], (votes) => {
    if (show_no !== "0") {
      return votes.filter((v) => v.show_no === parseInt(show_no));
    }
    return [...votes];
  });
