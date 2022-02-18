import React from "react";
import { Card, Figure } from "react-bootstrap";
import { connect } from "react-redux";
// Styles for Popular Stars
const styles = {
  starImage: {
    height: "5.5rem",
    width: "4.4rem",
    marginTop: "0.5rem",
    borderRadius: "10%",
    objectFit: "cover",
    objectPosition: "50% 0",
  },
  popularCard: {
    paddingTop: "1rem",
  },
  starFigure: {
    padding: "0 0.25rem 0 0.25rem",
    borderRadius: "10%",
  },
  caption: {
    width: "5.5rem",
    marginRight: "0.25rem",
    marginLeft: "0.25rem",
    height: "2.5rem",
    overflow: "hidden",
  },
};

/*
 * Component to display the trending searches based on TMDB api
 */

class PopularStars extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card style={styles.popularCard}>
        <Card.Title>Trending Searches</Card.Title>
        <Card.Body>
          {this.props.popularPeople.slice(0, 4).map((star) => {
            return (
              <Figure
                key={star.id}
                style={styles.starFigure}
                onClick={() => this.props.handleClick(star)}
                className="figure"
              >
                <Figure.Image
                  style={styles.starImage}
                  alt={`Profile image of ${star.name}`}
                  src={`https://image.tmdb.org/t/p/w200/${star.profile_path}`}
                  onError={(evt) => {
                    evt.target.onError = null;
                    evt.target.src = "/default.png";
                  }}
                />
                <Figure.Caption className="text-center" style={styles.caption}>
                  {star.name}
                </Figure.Caption>
              </Figure>
            );
          })}
        </Card.Body>
      </Card>
    );
  }
}

const mapState = (state) => {
  return {
    popularPeople: state.data.popularPeople,
  };
};

export default connect(mapState)(PopularStars);
