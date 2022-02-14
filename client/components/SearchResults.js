import React from "react";
import { Container, Row, Col, Image, ListGroup } from "react-bootstrap";
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
    this.onClick = this.onClick.bind(this);
  }

  // Function for when search results are clicked
  onClick(star) {
    console.log(`clicked on ${star.name}`);
  }

  render() {
    return (
      <ListGroup>
        {this.props.searchResults.length > 0 &&
          this.props.searchResults.map((star) => {
            return (
              <ListGroup.Item
                key={star.id}
                action
                onClick={() => this.onClick(star)}
              >
                <Container style={styles.searchResult}>
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
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    );
  }
}

const mapState = (state) => {
  return {
    searchResults: state.singleStar.searchResults,
  };
};

export default connect(mapState)(SearchResults);
