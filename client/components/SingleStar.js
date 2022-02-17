import React from "react";
import { Modal, Button } from "react-bootstrap";

// Single Star styles
const styles = {
  modal: {
    positionTop: "20%",
  },
};

/*
 * Single star component as modal to display when search is clicked
 */
export default class SingleStar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        style={styles.modal}
        show={this.props.show}
        onHide={this.props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Just one star</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
