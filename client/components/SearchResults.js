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
    objectPosition: "50% 0",
    display: "flex",
    flexDirection: "row",
  },
  searchResult: {
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    marginLeft: "5%",
    textAlign: "left",
  },
  resultText: {
    paddingLeft: "2rem",
    paddingTop: "0.5rem",
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
                <Container
                  className="d-flex justify-content-start"
                  style={styles.searchResult}
                >
                  <Image
                    style={styles.starImage}
                    alt={`Image of ${star.name}`}
                    src={`https://image.tmdb.org/t/p/w200/${star.profile_path}`}
                    onError={(evt) => {
                      evt.target.onError = null;
                      evt.target.src = "./default.png";
                    }}
                  />
                  <span style={styles.resultText}>
                    <p>{star.name}</p>
                  </span>
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
