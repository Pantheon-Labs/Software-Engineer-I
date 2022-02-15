import React from "react";
import { Container } from "react-bootstrap";

// Footer styles
const styles = {
  footer: {
    height: "2.5rem",
    backgroundColor: "#e9ecef",
    width: "100%",
    position: "absolute",
    bottom: "0",
    fontWeight: "lighter",
  },
  text: {
    paddingTop: "0.5rem",
  },
};

/*
 * Footer component includes link to repository
 */
export default class Footer extends React.Component {
  render() {
    return (
      <div style={styles.footer}>
        <Container>
          <div className="text-center" style={styles.text}>
            Find this project's code on{" "}
            <a href="https://github.com/emeshnick/actor-search">Github</a>
          </div>
        </Container>
      </div>
    );
  }
}
