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
  async request() {
    const res = axios.get(
      `https://api.themoviedb.org/3/movie/76341?api_key=${TMDBKey}`
    );
    console.log(res);
  }

  render() {
    this.props.connectTmdb();
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
