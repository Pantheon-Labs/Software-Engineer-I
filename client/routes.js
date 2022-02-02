import React from "react";
import Home from "./components/Home";
import About from "./components/About";
import { Route } from "react-router-dom";

class Routes extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </div>
    );
  }
}

export default Routes;
