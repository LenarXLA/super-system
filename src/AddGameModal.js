import React, {Component} from "react";
import { Modal,Button,Row,Col,Form, ModalHeader, ModalTitle, ModalBody, FormGroup, FormLabel, FormControl, ModalFooter } from "react-bootstrap";

export class AddGameModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(process.env.REACT_APP_API+'game',{
      method:'POST',
      headers: {
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        GameTitle:event.target.GameTitle.value
      })
    })
    .then(responce => responce.json())
    .then((result) => {
      alert(result);
    },
    (error) => {
      alert('Failed');
    });
  }

  render() {
    return(
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <ModalHeader id="contained-modal-title-vcenter">
            <ModalTitle>
              Add game
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>

                  <FormGroup controlId="GameTitle">
                    <FormLabel>GameTitle</FormLabel>
                    <FormControl type="text" name="GameTitle" required placeholder="GameTitle" />
                  </FormGroup>

                  <FormGroup controlId="GameTitle">
                    <Button variant="primary" type="submit">
                      Add Game
                    </Button>
                  </FormGroup>

                </Form>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}