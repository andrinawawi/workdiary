import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

/* Table row for task ....*/
class TableRowTask extends Component {
  constructor(props) {
      super(props);
      this.handleShowDelete = this.handleShowDelete.bind(this);
  }
  
  handleShowDelete(event) {
    event.preventDefault();
    
    // display delete warning dialog 
    this.props.delhandler(this.props.obj.id);
  }
  
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.id}
          </td>
          <td>
            {this.props.obj.description}
          </td>
          <td className={this.props.obj.status.toString().toLowerCase()}>
            {this.props.obj.status}
          </td>
          <td>
            {this.props.obj.user.email}
          </td>
          <td>
            <Link to={"edit-task/"+this.props.obj.id} className="btn btn-primary">Edit</Link>
			<input onClick={this.handleShowDelete} type="button" value="Delete Task" className="btn btn-danger"/>
          </td>
        </tr>
    );
  }
}

export default TableRowTask;
