import React, {Component} from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { ButtonToolbar, Button } from 'react-bootstrap';

class EditUser extends Component {
  constructor(props) {
      super(props);
      this.state = {name: '', email: ''};
      this.handleChange1 = this.handleChange1.bind(this);
      this.handleChange2 = this.handleChange2.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    axios.get(`/user/${this.props.params.id}/edit`)
    .then(response => {
      this.setState({ name: response.data.name, email: response.data.email });
    })
    .catch(function (error) {
      console.log(error);
    })
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
          this.props.history.push('/users');
    });
  }
  
  // go to back....
  handleCancel(e) {
      // to react tasks url
      browserHistory.push('/users');  	
  }
  
  render(){
    return (
      <div>
        <h1>Update User</h1>
        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <Link to="/users" className="btn btn-success">Back</Link>
          </div>
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
				  <button onClick={this.handleSubmit} className="btn btn-primary">Update</button>
				  <button onClick={this.handleCancel} className="btn btn-warning">Cancel</button>
				</ButtonToolbar>
            </div>
        </form>
    </div>
    )
  }
}
export default EditUser;
