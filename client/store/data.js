import axios from "axios";
import { TMDBKey } from "../../secrets";
const CONNECT_TMDB = "CONNECT_TMDB";

const connectedTmdb = () => {
  return {
    type: CONNECT_TMDB,
  };
};

export const connectTmdb = () => {
  return async (dispatch) => {
    const api = await axios.create({ baseURL: "https://api.themoviedb.org/3" });
    const res = await api.get("movie/upcoming", {
      params: { api_key: TMDBKey },
    });
    console.log(res.data);
  };
};

export default function (state = [], action) {
  switch (action.type) {
    default:
      return state;
  }
}
