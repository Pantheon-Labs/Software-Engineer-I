import axios from "axios";
import { TMDBKey } from "../../secrets";

const CONNECT_TMDB = "CONNECT_TMDB";

const connectedTmdb = (api, apiResults) => {
  return {
    type: CONNECT_TMDB,
    popularPeople: apiResults,
    api,
  };
};

export const connectTmdb = () => {
  return async (dispatch) => {
    const api = await axios.create({ baseURL: "https://api.themoviedb.org/3" });
    const res = await api.get("person/popular", {
      params: { api_key: TMDBKey },
    });
    dispatch(connectedTmdb(api, res.data.results));
  };
};

export default function (state = {}, action) {
  switch (action.type) {
    case CONNECT_TMDB:
      return { api: action.api, popularPeople: action.popularPeople, ...state };
    default:
      return state;
  }
}
