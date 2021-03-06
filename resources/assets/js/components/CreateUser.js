import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../Actions';

class CreateUser extends Component {
  constructor(props){
    super(props);
    this.state = {name: '', email: ''};

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleChange1(e){
    this.setState({
      name: e.target.value
    })
  }
  handleChange2(e){
    this.setState({
      email: e.target.value
    })
  }
  handleSubmit(e){
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email
    }
    let uri = '/user';
    axios.post(uri, data).then((response) => {
      // go back to task listing page  and reload
	  this.props.updateTaskList(true)
    });
  }
  // go to back....
  handleCancel(e) {
      // go back to User listing page 
	  this.props.updateUserList()
  }

    render() {
      return (
      <div>
        <h1>Create A User</h1>
        <form>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Name:</label>
                <input type="text" className="form-control" onChange={this.handleChange1} />
              </div>
            </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Email:</label>
                  <input type="email" className="form-control col-md-6" onChange={this.handleChange2} />
                </div>
              </div>
            </div><br />
            <span>Note: default password is 123456</span>
            <div className="form-group">
				<ButtonToolbar>
				  <button type="button" onClick={this.handleSubmit} className="btn btn-primary">Add User</button>
				  <button type="button" onClick={this.handleCancel} className="btn btn-warning">Cancel</button>
				</ButtonToolbar>
            </div>
            
        </form>
		</div>
      )
    }
}

export default connect(null, actions)(CreateUser);
