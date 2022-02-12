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
      console.log(process.env);
      const res = await axios.get(
        "https://api.themoviedb.org/3/person/popular",
        {
          params: { api_key: process.env.TMDB_KEY },
        }
      );

      dispatch(gotPopular(res.data.results));
    } catch (err) {
      throw err;
    }
  };
};

const getImagePath = async (api, id) => {
  const res = await api.get(
    `https://api.themoviedb.org/3/person/${id}/images`,
    {
      params: { api_key: process.env.TMDB_KEY },
    }
  );
  return res.data.profiles[0].file_path;
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
