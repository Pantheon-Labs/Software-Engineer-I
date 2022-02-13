import axios from "axios";

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
      const res = await axios.get("/api/search/person", {
        params: { starName: starName },
      });

      dispatch(searchedStar(res.data));
    } catch (err) {
      throw err;
    }
  };
};

// Call to api and then dispatch
export const getStar = (starId) => {};

// Default state
const defaultState = {
  searchResults: [],
};

// Reducer contains all information from star API call
export default function (state = defaultState, action) {
  switch (action.type) {
    case SEARCH_STAR:
      return { ...state, searchResults: action.searchResults };
    case GET_STAR:
      return action.star;
    default:
      return state;
  }
}
