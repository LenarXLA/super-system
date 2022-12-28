import React, {Component} from "react";
import { Modal,Button,Row,Col,Form, ModalHeader, ModalTitle, ModalBody, FormGroup, FormLabel, FormControl, ModalFooter } from "react-bootstrap";

export class EditGameModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(process.env.REACT_APP_API+'game',{
      method:'PUT',
      headers: {
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        GameId:event.target.GameId.value,
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
              Edit game
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>

                  <FormGroup controlId="GameId">
                    <FormLabel>GameId</FormLabel>
                    <FormControl type="text" name="GameId" required disabled 
                    defaultValue={this.props.gameid} placeholder="GameId" />
                  </FormGroup>

                  <FormGroup controlId="GameTitle">
                    <FormLabel>GameTitle</FormLabel>
                    <FormControl type="text" name="GameTitle" required 
                    defaultValue={this.props.gametitle} placeholder="GameTitle" />
                  </FormGroup>

                  <FormGroup>
                    <Button variant="primary" type="submit">
                      Update Game
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