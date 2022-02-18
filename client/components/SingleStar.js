import React from "react";
import { Modal, Button, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { astrology } from "../signs";

// Single Star styles
const styles = {
  modal: {
    paddingTop: "20%",
  },
  starImage: {
    height: "10rem",
    width: "8rem",
    borderRadius: "10%",
    objectFit: "cover",
    objectPosition: "50% 0",
  },
};

/*
 * Single star component as modal to display when search is clicked
 */
class SingleStar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { singleStar } = this.props;
    return (
      <Modal
        style={styles.modal}
        show={this.props.show}
        onHide={this.props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{singleStar.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={"text-center"}>
          <Image
            style={styles.starImage}
            alt={`Image of ${singleStar.name}`}
            src={`https://image.tmdb.org/t/p/w200/${singleStar.profile_path}`}
            onError={(evt) => {
              evt.target.onError = null;
              evt.target.src = "./default.png";
            }}
          />
          {singleStar.birthday ? (
            <p>
              {singleStar.name} is a
              {" " +
                astrology[singleStar.birthday[5] + singleStar.birthday[6]][
                  singleStar.birthday[8] + singleStar.birthday[9]
                ]}
            </p>
          ) : (
            <p>
              We can't find {singleStar.name}'s birthday! If you know it, you
              could help us out and add it to the{" "}
              <a href="https://www.themoviedb.org/contribute?language=en-US">
                database
              </a>
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapState = (state) => {
  return {
    singleStar: state.singleStar.singleStar,
  };
};

export default connect(mapState)(SingleStar);
