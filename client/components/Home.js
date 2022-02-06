import React from "react";
import { Container } from "react-bootstrap";
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
        {this.props.popularPeople && (
          <Container>
            <h3>Trending Stars</h3>
            {this.props.popularPeople.slice(0, 4).map((star) => {
              console.log("hello");
              return <p key={star.id}> {star.name}</p>;
            })}
          </Container>
        )}
      </Container>
    );
  }
}

const mapState = (state) => {
  return {
    popularPeople: state.data.popularPeople,
  };
};

const mapDispatch = (dispatch) => {
  return {
    connectTmdb: () => dispatch(connectTmdb()),
  };
};

export default connect(mapState, mapDispatch)(Home);
