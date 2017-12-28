import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import DialogBox from './Overlay';

class TableRow extends Component {
  constructor(props) {
      super(props);
      this.handleShowDelete = this.handleShowDelete.bind(this);
      this.handleShowTeam = this.handleShowTeam.bind(this);
  }
  
  handleShowDelete(event) {
    event.preventDefault();
    
    // display delete warning dialog 
    this.props.delhandler(this.props.obj.id);
  }

  handleShowTeam(event) {
    event.preventDefault();
    
    // display dialog with all team members of this project as selected...
    // and other members of this Admin as available to select ....    
 	// At update of this dialog, send request to server to update
 	// project's users....
    this.props.handler(this.props.obj.id);
  }

  render() {
    return (
        <tr>
          <td>
            {this.props.obj.id}
          </td>
          <td>
            {this.props.obj.name}
          </td>
          <td>
            {this.props.obj.description}
          </td>
          <td>
			<input onClick={this.handleShowTeam} type="button" value="Team" className="btn btn-info"/>
            <Link to={"tasks/project/"+this.props.obj.id} className="btn btn-primary">Tasks</Link>
            <Link to={"edit-project/"+this.props.obj.id} className="btn btn-primary">Edit</Link>
			<input onClick={this.handleShowDelete} type="button" value="Delete" className="btn btn-danger"/>
          </td>
        </tr>
    );
  }
}

export default TableRow;
