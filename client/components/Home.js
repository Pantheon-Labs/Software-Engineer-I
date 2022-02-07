import React from "react";
import { Container, Figure } from "react-bootstrap";
import { connect } from "react-redux";
import { connectTmdb } from "../store/data";

const styles = {
  mainContainer: {
    padding: "5rem",
  },
  starImage: {
    height: "10rem",
    padding: "1rem",
  },
};

class Home extends React.Component {
  componentDidMount() {
    this.props.connectTmdb();
  }

  render() {
    return (
      <Container style={styles.mainContainer} className="text-center">
        <h1>Home</h1>
        {this.props.popularPeople && (
          <Container>
            <h3>Trending Searches</h3>
            {this.props.popularPeople.slice(0, 4).map((star) => {
              console.log(star.profile_path);
              return (
                <Figure key={star.id}>
                  <Figure.Image
                    style={styles.starImage}
                    alt={`Profile image of ${star.name}`}
                    src={`https://image.tmdb.org/t/p/w200/${star.profile_path}`}
                  />
                  <Figure.Caption className="text-center">
                    {star.name}
                  </Figure.Caption>
                </Figure>
              );
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
