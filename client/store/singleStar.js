import axios from "axios";
import { TMDBKey } from "../../secrets";

/*
 * Action creators, thunks, and reducer for individual celebrities
 */

const GET_STAR = "GET_STAR";
const SEARCH_STAR = "SEARCH_STAR";

// Search for actor by name
const searchedStar = (searchResults) => {
  return {
    type: SEARCH_STAR,
    searchResults,
  };
};

// Action creator for dispatch
const gotStar = (star) => {
  return {
    type: GET_STAR,
    star,
  };
};

// Thunk to search star by name
export const searchStar = (starName) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/person/popular",
        {
          params: { api_key: TMDBKey, query: `${starName}` },
        }
      );

      dispatch(searchedStar(res.data));
    } catch (err) {
      throw err;
    }
  };
};

// Call to api and then dispatch
export const getStar = (starId) => {};

// Reducer contains all information from star API call
export default function (state = {}, action) {
  switch (action.type) {
    case GET_STAR:
      return action.star;
    default:
      return state;
  }
}
