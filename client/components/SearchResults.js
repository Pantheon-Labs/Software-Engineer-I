import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";

// Styles for search results
const styles = {
  starImage: {
    height: "5rem",
    width: "4rem",
    borderRadius: "10%",
    objectFit: "cover",
    objectPosition: "0 0",
  },
  searchResult: {
    paddingTop: "0.5",
    paddingBottom: "0.5rem",
    marginLeft: "3rem",
    textAlign: "left",
  },
};

/*
 * Component to display the list of results for the search through actor names
 */

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.searchResults.length > 0 &&
      this.props.searchResults.map((star) => {
        return (
          <Container key={star.id} style={styles.searchResult}>
            <Row>
              <Col xs={3}>
                <Image
                  style={styles.starImage}
                  alt={`Profile image of ${star.name}`}
                  src={`https://image.tmdb.org/t/p/w200/${star.profile_path}`}
                />
              </Col>
              <Col xs={7} className="text-left">
                <p className="text-left">{star.name}</p>
              </Col>
            </Row>
          </Container>
        );
      })
    );
  }
}

const mapState = (state) => {
  return {
    searchResults: state.singleStar.searchResults,
  };
};

export default connect(mapState)(SearchResults);
