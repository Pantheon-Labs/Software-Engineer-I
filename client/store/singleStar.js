import axios from "axios";
import { TMDBKey } from "../../secrets";

/*
 * Action creators, thunks, and reducer for individual celebrities
 */

const GET_STAR = "GET_STAR";

// Action creator for dispatch
const gotStar = (star) => {
  return {
    type: GET_STAR,
    star,
  };
};

// Call to api and then dispatch
export const getStar = (name) => {};

// Reducer contains all information from star API call
export default function (state = {}, action) {
  switch (action.type) {
    case GET_STAR:
      return action.star;
    default:
      return state;
  }
}
