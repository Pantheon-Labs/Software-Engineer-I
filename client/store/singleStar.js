import axios from "axios";

/*
 * Action creators, thunks, and reducer for individual celebrities
 */

const SEARCH_STAR = "SEARCH_STAR";
const GET_STAR = "GET_STAR";
const CLEAR_STAR = "CLEAR_STAR";

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

// Action creator to clear star
const clearedStar = () => {
  return {
    type: CLEAR_STAR,
  };
};

// Thunk to search star by name
export const searchStar = (starName) => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/search/person", {
        params: { starName: starName },
      });

      let birthday = "uknown";

      for (let i = 0; i < res.data.length; i++) {
        try {
          birthday = await getBirthday(res.data[i].id);

          res.data[i] = {
            ...res.data[i],
            birthday: birthday ? birthday : "unknown",
          };
        } catch (err) {
          res.data[i] = {
            ...res.data[i],
            birthday: "unknown",
          };
        }
      }

      dispatch(searchedStar(res.data));
    } catch (err) {
      throw err;
    }
  };
};

// Single star call to api and then dispatch
export const getStar = (starId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/person", {
        params: { starId },
      });

      dispatch(gotStar(res.data));
    } catch (err) {
      throw err;
    }
  };
};

// Dispatch function to clear singleStar
export const clearStar = () => {
  return (dispatch) => {
    dispatch(clearedStar());
  };
};

// Helper function to get birthday
const getBirthday = async (starId) => {
  try {
    const res = await axios.get("/api/person/birthday", {
      params: { starId },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

// Default state
const defaultState = {
  searchResults: [],
  singleStar: null,
};

// Reducer contains all information from star API call
export default function (state = defaultState, action) {
  switch (action.type) {
    case SEARCH_STAR:
      return { ...state, searchResults: action.searchResults };
    case GET_STAR:
      return { ...state, singleStar: action.star };
    case CLEAR_STAR:
      return { ...state, singleStar: null };
    default:
      return state;
  }
}
