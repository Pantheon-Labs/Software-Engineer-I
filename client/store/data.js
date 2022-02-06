import axios from "axios";
import { TMDBKey } from "../../secrets";

const CONNECT_TMDB = "CONNECT_TMDB";

const connectedTmdb = (api) => {
  return {
    type: CONNECT_TMDB,
    api,
  };
};

export const connectTmdb = () => {
  return async (dispatch) => {
    const api = await axios.create({ baseURL: "https://api.themoviedb.org/3" });
    const res = await api.get("person/popular", {
      params: { api_key: TMDBKey },
    });
    console.log(res.data);
    console.log("called");
    dispatch(connectedTmdb(api));
  };
};

export default function (state = {}, action) {
  switch (action.type) {
    case CONNECT_TMDB:
      return { api: action.api, ...state };
    default:
      return state;
  }
}
