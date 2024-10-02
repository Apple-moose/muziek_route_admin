import { createSelector } from "reselect";

export const selectVotesState = (reduxState) => reduxState.votes.votes;

export const selectVotes = selectVotesState;

export const selectFilteredVotes = (show_no) =>
  createSelector([selectVotesState], (votes) => {
    if (show_no !== "0") {
      return votes.filter((v) => v.show_no === parseInt(show_no));
    }
    return [...votes]; // Return a shallow copy of the votes array
  });

//   export const selectVotesBySongs = createSelector(
//     [selectVotesState],
//     (votes) => {
//       const alphaArray = [...votes];
//       return alphaArray.sort((a, b) => {
//         if (parseInt(b.show_no) > parseInt(a.show_id)) return 1;
//         else if (parseInt(b.show_id) < parseInt(a.show_id)) return -1;
//         else return 0;
//       });
//     }
//   );

// export const selectVotesByUsername = createSelector(
//     [selectVotesState],
//     (votes) => {
//       const alphaArray = [...votes];
//       return alphaArray.sort((a, b) => a.username.localeCompare(b.username));
//     }
//   );

//   export const selectVotesByPrices = createSelector(
//     [selectVotesState],
//     (votes) => {
//       const alphaArray = [...votes];
//       return alphaArray.sort((a, b) => {
//         if (parseInt(b.price) > parseInt(a.price)) return 1;
//         else if (parseInt(b.price) < parseInt(a.price)) return -1;
//         else return 0;
//       });
//     }
//   );
