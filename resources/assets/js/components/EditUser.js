import React, {Component} from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../Actions';

class EditUser extends Component {
  constructor(props) {
      super(props);
      this.state = {name: '', email: ''};
      this.handleChange1 = this.handleChange1.bind(this);
      this.handleChange2 = this.handleChange2.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
  }

	// fetch user data & update state....
  componentDidMount(){
    axios.get(`/user/${this.props.params.id}/edit`)
    .then(response => {
      this.props.editUser({ name: response.data.name, email: response.data.email });
    })
    .catch(function (error) {
      console.log(error);
    })
  }
    
	componentWillReceiveProps(nextProps){
		// only proceed if change in existing property.....
		if (this.props.name != nextProps.name ||
			this.props.email != nextProps.email) {
			this.setState({
			  name: nextProps.name,
			  email: nextProps.email
			})
		}
	}
  
  handleChange1(e){
   // setState is shallow merge of new state into previous.....
    this.setState({
      name: e.target.value
    })
  }
  handleChange2(e){
    this.setState({
      email: e.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const project = {
      name: this.state.name,
      email: this.state.email
    }
    let uri = '/user/'+this.props.params.id;
    axios.patch(uri, project).then((response) => {
		  // go back to User listing page 
		  this.props.updateUserList(true);
    });
  }
  
  // go to back....
  handleCancel(e) {
      // go back to User listing page 
	  this.props.updateUserList()
  }
  
  render(){
    return (
      <div>
        <h1>Update User</h1>
        <div className="row">
          <div className="col-md-10"></div>
        </div>
        <form>
            <div className="form-group">
                <label>Name</label>
                <input type="text"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.handleChange1} />
            </div>

            <div className="form-group">
                <label name="email">Email</label>
                <input type="email" className="form-control"
                  value={this.state.email}
                  onChange={this.handleChange2} />
            </div>

            <div className="form-group">
				<ButtonToolbar>
				  <button type="button" onClick={this.handleSubmit} className="btn btn-primary">Update</button>
				  <button type="button" onClick={this.handleCancel} className="btn btn-warning">Cancel</button>
				</ButtonToolbar>
            </div>
        </form>
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    name: state.edit_user_reducer.name,
    email: state.edit_user_reducer.email,
  }
}

export default connect(mapStateToProps, actions)(EditUser);
