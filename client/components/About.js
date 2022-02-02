import React from "react";
import { Container } from "react-bootstrap";

const styles = {
  mainContainer: {
    padding: "5rem",
  },
};
class About extends React.Component {
  render() {
    return (
      <Container style={styles.mainContainer}>
        <h1>About</h1>
        <p>Created in 2021</p>
      </Container>
    );
  }
}

export default About;
