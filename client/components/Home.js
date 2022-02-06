import React from "react";
import { Container } from "react-bootstrap";
import { TMDBKey } from "../../secrets";
import { connect } from "react-redux";
import { connectTmdb } from "../store/data";

const styles = {
  mainContainer: {
    padding: "5rem",
  },
};

class Home extends React.Component {
  componentDidMount() {
    this.props.connectTmdb();
  }

  render() {
    return (
      <Container style={styles.mainContainer}>
        <h1>Home</h1>
        <h2>Actor Search</h2>
      </Container>
    );
  }
}

const mapState = (state) => {
  return {
    data: state.data,
  };
};

const mapDispatch = (dispatch) => {
  return {
    connectTmdb: () => dispatch(connectTmdb()),
  };
};

export default connect(mapState, mapDispatch)(Home);
