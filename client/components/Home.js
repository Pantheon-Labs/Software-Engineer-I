import React from "react";
import { Container } from "react-bootstrap";

const styles = {
  mainContainer: {
    padding: "5rem",
  },
};
class Home extends React.Component {
  render() {
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
