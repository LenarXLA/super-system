import React,{Component} from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";

import {AddGameModal} from "./AddGameModal";
import {EditGameModal} from "./EditGameModal";



export class Game extends Component {

  constructor(props) {
    super(props);
    this.state={games:[], addModalShow:false, editModalShow:false}
  }

  refreshList() {
    fetch(process.env.REACT_APP_API+'game')
    .then(responce => responce.json())
    .then(data => {
      this.setState({games:data});
    });
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate() {
    this.refreshList();
  }

  deleteGame(gameid) {
    if (window.confirm("Are you sure?")) {
      fetch(process.env.REACT_APP_API+'game/'+gameid,{
        method:'DELETE',
        headers: {
          'Accept':'application/json',
          'Content-type':'application/json'
        }
      });
    }
  }

  render() {
    const {games, gameid, gametitle} = this.state;
    let addModalClose = () => this.setState({addModalShow:false});
    let editModalClose = () => this.setState({editModalShow:false});
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>GameId</th>
              <th>GameTitle</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {games.map(game => 
              <tr key={game.GameId}>
                <td>{game.GameId}</td>
                <td>{game.GameTitle}</td>
                <td>
                <ButtonToolbar>
                  <Button classname="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, 
                          gameid:game.GameId,gametitle:game.GameTitle})}>
                      Edit
                  </Button>
                  <Button classname="mr-2" variant="danger" onClick={()=>this.deleteGame(game.GameId)}>
                      Delete
                  </Button>
                  <EditGameModal show={this.state.editModalShow} onHide={editModalClose}
                                gameid={gameid}
                                gametitle={gametitle} />
                </ButtonToolbar>
                </td>
              </tr>
              )}
          </tbody>
        </Table>

        <ButtonToolbar>
          <Button variant="primary" onClick={()=>this.setState({addModalShow:true})}>
              Add Game
          </Button>
          <AddGameModal show={this.state.addModalShow} onHide={addModalClose} />
        </ButtonToolbar>
      </div>
    )
  }
}