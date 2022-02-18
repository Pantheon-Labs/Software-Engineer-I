import React from "react";
import {
  Container,
  InputGroup,
  Button,
  FormControl,
  Spinner,
} from "react-bootstrap";
import SearchResults from "./SearchResults";
import SingleStar from "./SingleStar";
import PopularStars from "./PopularStars";
import { connect } from "react-redux";
import { getPopular } from "../store/data";
import { searchStar, getStar, clearStar } from "../store/singleStar";

// Styles for homepage
const styles = {
  mainContainer: {
    paddingTop: "4rem",
    paddingBottom: "5rem",
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
  async handleClick(star) {
    try {
      await this.props.getStar(star.id);

      // Open SingleStar modal
      this.setState({ showSingleStar: true });
    } catch (err) {
      this.setState(err);
    }
  }

  // Handle closing single star modal
  handleClose() {
    this.setState({ showSingleStar: false });
    this.props.clearStar();
  }

  // Search function on input, changes status to loading and loaded
  async search(evt) {
    evt.preventDefault();

    try {
      this.setState({ status: "loading" });
      await this.props.searchStar(this.state.searchInput);
      this.setState({ status: "loaded" });
    } catch {
      this.setState({ status: "error" });
    }
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
          <PopularStars handleClick={this.handleClick} />
        )}

        {this.state.status === "loading" && (
          <div style={styles.loading}>
            <Spinner animation="grow" />
            <Spinner animation="grow" />
            <Spinner animation="grow" />
          </div>
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
    clearStar: () => dispatch(clearStar()),
  };
};

export default connect(mapState, mapDispatch)(Home);
