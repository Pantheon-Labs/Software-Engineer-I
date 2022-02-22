import axios from "axios";
/*
 * Action creators, thunks, and reducer
 * Get actor information from API
 */

const GET_POPULAR = "GET_POPULAR";

// Action creator for dispatch
const gotPopular = (apiResults) => {
  return {
    type: GET_POPULAR,
    popularPeople: apiResults,
  };
};

//Gets list of current popular actors
export const getPopular = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api");
      dispatch(gotPopular(res.data));
    } catch (err) {
      throw err;
    }
  };
};

// State contains list of popular people
export default function (state = {}, action) {
  switch (action.type) {
    case GET_POPULAR:
      return { popularPeople: action.popularPeople, ...state };
    default:
      return state;
  }
}
