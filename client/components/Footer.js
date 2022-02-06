import React from "react";
import { Container } from "react-bootstrap";

const styles = {
  footer: {
    height: "2.5rem",
    backgroundColor: "#e9ecef",
    width: "100%",
    position: "sticky",
    bottom: "0",
    fontWeight: "lighter",
  },
  text: {
    paddingTop: "0.5rem",
  },
};

export default class Footer extends React.Component {
  render() {
    return (
      <div style={styles.footer}>
        <Container>
          <div className="text-center" style={styles.text}>
            Find this project's repository on{" "}
            <a href="https://github.com/emeshnick/boilerplate">Github</a>
          </div>
        </Container>
      </div>
    );
  }
}
