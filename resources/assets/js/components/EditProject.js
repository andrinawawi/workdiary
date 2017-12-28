import React, {Component} from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { ButtonToolbar, Button } from 'react-bootstrap';

class EditProject extends Component {
  constructor(props) {
      super(props);
      this.state = {name: '', description: ''};
      this.handleChange1 = this.handleChange1.bind(this);
      this.handleChange2 = this.handleChange2.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    axios.get(`/project/${this.props.params.id}/edit`)
    .then(response => {
      this.setState({ name: response.data.name, description: response.data.description });
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  handleChange1(e){
    this.setState({
      name: e.target.value
    })
  }
  handleChange2(e){
    this.setState({
      description: e.target.value
    })
  }

  // go to back....
  handleCancel(e) {
      // to react tasks url
      browserHistory.push('/projects');  	
  }

  handleSubmit(event) {
    event.preventDefault();
    const project = {
      name: this.state.name,
      description: this.state.description
    }
    let uri = '/project/'+this.props.params.id;
    axios.patch(uri, project).then((response) => {
          this.props.history.push('/projects');
    });
  }
  render(){
    return (
      <div>
        <h1>Edit Project</h1>
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
                <label name="product_description">Description</label>
                <input type="text" className="form-control"
                  value={this.state.description}
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
export default EditProject;
