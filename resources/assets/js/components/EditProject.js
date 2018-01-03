import React, {Component} from 'react';
import { Link, browserHistory } from 'react-router';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../Actions';

class EditProject extends Component {
  constructor(props) {
      super(props);
      this.state = {name: '', description: ''};
      this.handleChange1 = this.handleChange1.bind(this);
      this.handleChange2 = this.handleChange2.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount(){
// 	console.log("COmponent Project Edit mounted, update state");
  	
    axios.get(`/project/${this.props.params.id}/edit`)
    .then(response => {
      this.props.editProject(response.data);
//       this.setState({ name: response.data.name, description: response.data.description });
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  
	componentWillReceiveProps(nextProps){
		console.log("EDIT PROPS RECEIVED, update state");
// 		console.log(nextProps);
		// only proceed if change in realod property.....
		if (this.props.name != nextProps.name ||
			this.props.description != nextProps.description) {
			this.setState({
			  name: nextProps.name,
		      description: nextProps.description
			})
		}
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
      // to back to project listing
	  this.props.updateProjectList()
  }

  handleSubmit(event) {
    event.preventDefault();
    const project = {
      name: this.state.name,
      description: this.state.description
    }
    let uri = '/project/'+this.props.params.id;
    axios.patch(uri, project).then((response) => {
    	// cause project listing to reload.....
		this.props.updateProjectList(true)
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
    name: state.edit_project_reducer.name,
    description: state.edit_project_reducer.description
  }
}

export default connect(mapStateToProps, actions)(EditProject);
