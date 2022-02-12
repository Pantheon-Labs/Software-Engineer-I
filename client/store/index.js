import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import data from "./data.js";
import singleStar from "./singleStar.js";

/*
 * Reducer composed with middleware
 */
const reducer = combineReducers({ data, singleStar });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

// Export store for use in React components
export default store;
