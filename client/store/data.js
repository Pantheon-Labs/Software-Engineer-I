import axios from "axios";
import { TMDBKey } from "../../secrets";

const GET_POPULAR = "GET_POPULAR";

const gotPopular = (apiResults) => {
  return {
    type: GET_POPULAR,
    popularPeople: apiResults,
  };
};

export const getPopular = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/person/popular",
        {
          params: { api_key: TMDBKey },
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
      params: { api_key: TMDBKey },
    }
  );
  return res.data.profiles[0].file_path;
};

export default function (state = {}, action) {
  switch (action.type) {
    case GET_POPULAR:
      return { popularPeople: action.popularPeople, ...state };
    default:
      return state;
  }
}
