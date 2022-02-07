import axios from "axios";
import { TMDBKey } from "../../secrets";

const GET_STAR = "GET_STAR";

const gotStar = (star) => {
  return {
    type: GET_STAR,
    star,
  };
};

export const getStar = (name) => {};

export default function (state = {}, action) {
  switch (action.type) {
    case GET_STAR:
      return action.star;
    default:
      return state;
  }
}
