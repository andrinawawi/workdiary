import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class TableRowUser extends Component {
  constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    
    if (confirm("Are you sure want to Remove user from Team!")) {    
		let uri = `/project/remove-user/`;
// 		axios.delete(uri);
// 		browserHistory.push('/users');

		const data = {
		  project_id: this.props.obj.project_id,
		  user_id: this.props.obj.id
		}
		axios.post(uri, data).then((response) => {
		  browserHistory.push('/users');
		});

    }
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
            {this.props.obj.email}
          </td>
          <td>
            <Link to={"tasks"} className="btn btn-primary">Tasks</Link>
            <Link to={"edit-user/"+this.props.obj.id} className="btn btn-primary">Edit</Link>
			<input onClick={this.handleSubmit} type="button" value="Delete" className="btn btn-danger"/>
          </td>
        </tr>
    );
  }
}

export default TableRowUser;
