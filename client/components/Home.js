import React from "react";
import { Container } from "react-bootstrap";
import { TMDBKey } from "../../secrets";
import axios from "axios";

const styles = {
  mainContainer: {
    padding: "5rem",
  },
};

class Home extends React.Component {
  async request() {
    const res = axios.get(
      `https://api.themoviedb.org/3/movie/76341?api_key=${TMDBKey}`
    );
    console.log(res);
  }

  render() {
    this.request();
    return (
      <Container style={styles.mainContainer}>
        <h1>Home</h1>
        <h2>Welcome to Elijah Meshnick's Boilerplate code!</h2>
        <p>
          This is for a quick set up of a project that uses React, Bootstrap,
          Redux, and Express
        </p>
      </Container>
    );
  }
}

export default Home;
