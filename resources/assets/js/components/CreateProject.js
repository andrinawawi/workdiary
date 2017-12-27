import React, {Component} from 'react';
import {browserHistory} from 'react-router';

class CreateProject extends Component {
  constructor(props){
    super(props);
    this.state = {name: '', description: ''};

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  handleSubmit(e){
    e.preventDefault();
    const project = {
      name: this.state.name,
      description: this.state.description
    }
    let uri = '/project';
    axios.post(uri, project).then((response) => {
      browserHistory.push('/projects');
    });
  }

    render() {
      return (
      <div>
        <h1>Create A Project</h1>
        <form onSubmit={this.handleSubmit}>
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
                  <label>Description:</label>
                  <input type="text" className="form-control col-md-6" onChange={this.handleChange2} />
                </div>
              </div>
            </div><br />
            <div className="form-group">
              <button className="btn btn-primary">Add Project</button>
            </div>
        </form>
  </div>
      )
    }
}
export default CreateProject;
