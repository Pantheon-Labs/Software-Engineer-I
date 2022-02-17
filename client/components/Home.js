import React from "react";
import {
  Container,
  Figure,
  InputGroup,
  Button,
  FormControl,
} from "react-bootstrap";
import SearchResults from "./SearchResults";
import SingleStar from "./SingleStar";
import { connect } from "react-redux";
import { getPopular } from "../store/data";
import { searchStar, getStar } from "../store/singleStar";

// Styles for homepage
const styles = {
  mainContainer: {
    paddingTop: "5rem",
    paddingBottom: "5rem",
  },
  starImage: {
    height: "5rem",
    width: "4rem",
    borderRadius: "10%",
    objectFit: "cover",
    objectPosition: "50% 0",
  },
  starFigure: {
    padding: "0 0.25rem 0 0.25rem",
  },
};

/*
 * Home component with search input
 * Displays current popular searches
 */
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      status: "waiting",
      showSingleStar: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.search = this.search.bind(this);
  }

  // Get popular searches after the component mounts
  componentDidMount() {
    this.props.getPopular();
  }

  // Changes state as input changes
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  // Handle click if user clicks on star
  handleClick(star) {
    this.props.getStar(star.id);

    // Open SingleStar modal
    this.setState({ showSingleStar: true });
  }

  // Handle closing single star modal
  handleClose() {
    this.setState({ showSingleStar: false });
  }

  // Search function on input
  search(evt) {
    evt.preventDefault();

    this.setState({ status: "loading" });
    this.props.searchStar(this.state.searchInput);
    this.setState({ status: "loaded" });

    this.setState({ searchInput: "" });
  }

  render() {
    return (
      <Container
        id="main-container"
        style={styles.mainContainer}
        className="text-center"
      >
        <h1>Home</h1>
        <InputGroup className="mb-3">
          <FormControl
            name="searchInput"
            value={this.state.searchInput}
            onChange={this.handleChange}
            placeholder="Enter Name"
            aria-label="Star to search"
            aria-describedby="basic-addon2"
          />
          <Button
            onClick={this.search}
            variant="outline-secondary"
            id="button-addon2"
          >
            Search
          </Button>
        </InputGroup>

        {this.props.popularPeople && this.state.status === "waiting" && (
          <Container>
            <h3>Trending Searches</h3>
            {this.props.popularPeople.slice(0, 4).map((star) => {
              return (
                <Figure
                  key={star.id}
                  style={styles.starFigure}
                  onClick={() => this.handleClick(star)}
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
                  <Figure.Caption className="text-center">
                    {star.name}
                  </Figure.Caption>
                </Figure>
              );
            })}
          </Container>
        )}

        {this.props.searchResults.length > 0 && (
          <SearchResults handleClick={this.handleClick} />
        )}

        {this.props.singleStar && (
          <SingleStar
            handleClose={this.handleClose}
            show={this.state.showSingleStar}
          />
        )}
      </Container>
    );
  }
}

const mapState = (state) => {
  return {
    popularPeople: state.data.popularPeople,
    searchResults: state.singleStar.searchResults,
    singleStar: state.singleStar.singleStar,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getPopular: () => dispatch(getPopular()),
    searchStar: (starName) => dispatch(searchStar(starName)),
    getStar: (starId) => dispatch(getStar(starId)),
  };
};

export default connect(mapState, mapDispatch)(Home);
