import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import Select from 'react-select';
import { ButtonToolbar, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../Actions';

import 'react-datepicker/dist/react-datepicker.css';

class CreateTask extends Component {
  constructor(props){
    super(props);

    this.state = {
    		description: '',
    		status: 'ToDo',
    		end_date: moment(),
    		assigned_user_id:'',
    		project_id: ''
    	};

	this.mapUsersForSelectComponent = this.mapUsersForSelectComponent.bind(this);
	this.mapProjectsForSelectComponent = this.mapProjectsForSelectComponent.bind(this);
    this.handleChangeDesc = this.handleChangeDesc.bind(this);
    this.handleChangeProject = this.handleChangeProject.bind(this);
    this.handleChangeAssignee = this.handleChangeAssignee.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  
  	// Hack : We shouldn't call /task here, projects, users should already be available
  	// to this component.
  	// ToDo: Use Redux to solve this........DONE
	componentDidMount(){
// 		axios.get('/task')
// 		.then(response => {
		var tmpPros = this.mapProjectsForSelectComponent(this.props.projects);
		var tmpUsrs = this.mapUsersForSelectComponent(this.props.users);

		this.setState({
		  projects: tmpPros,
		  users: tmpUsrs
		});
		// select some defaults......
		if (tmpPros.length) {
			this.setState({
			  project_id: tmpPros[0].value
			});
		}
		if (tmpUsrs.length) {
			this.setState({
			  assigned_user_id: tmpUsrs[0].value
			});
		}
// 		})		
// 		.catch(function (error) {
// 		 console.log(error);
// 		})
	}
  
  handleChangeDesc(e){
    this.setState({
      description: e.target.value
    });
  }
  handleChangeAssignee(selectedOption){
    this.setState({
      assigned_user_id: selectedOption.value
    });
  }
  handleChangeProject(selectedOption){
    this.setState({
      project_id: selectedOption.value
    });
  }
  handleChangeDate(dateVal){
    this.setState({
      end_date: dateVal
    });
  }

  // Send POST to create task 
  handleSubmit(e){
    e.preventDefault();
    const data = {
      description: this.state.description,
      assigned_user_id: this.state.assigned_user_id,
      project_id: this.state.project_id,
      end_date: this.state.end_date.format("YYYY-MM-DD")
    }
    let uri = '/task';
    // Send POST server 
    axios.post(uri, data).then((response) => {
      // go back to task listing page  and reload
	  this.props.updateTaskList(true)
    });
    // also handle errors ......
  }
  
  // go back....
  handleCancel(e) {
      // go back to task listing page 
	  this.props.updateTaskList()
  }
	/* user select options array should contain objects {value, label}  */
	 mapUsersForSelectComponent(data) {
	 	var result = [];
	 	
	 	for (var index in data) {
	 		var tmpObj = data[index];
	 		result.push({value: tmpObj["id"], label:tmpObj["email"]});
	 	}
	 	return result;
	 }

	/* project select options array should contain objects {value, label}  */
	 mapProjectsForSelectComponent(data) {
	 	var result = [];
	 	
	 	for (var index in data) {
	 		var tmpObj = data[index];
	 		result.push({value: tmpObj["id"], label:tmpObj["name"]});
	 	}
	 	return result;
	 }
  

    render() {
      return (
      <div>
        <h1>Create a Task</h1>
        <form>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Description *</label>
                <input type="text" required className="form-control" onChange={this.handleChangeDesc} />
              </div>
            </div>
		</div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Assignee *</label>
                	<Select required
						name="assigned_user_id"
						value={this.state.assigned_user_id}
						onChange={this.handleChangeAssignee}
						options={this.state.users}
					  />
              </div>
            </div>
		</div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Project *</label>
                	<Select required
						name="project_id"
						value={this.state.project_id}
						onChange={this.handleChangeProject}
						options={this.state.projects}
					  />
              </div>
            </div>
		</div>
		<div className="row">
		  <div className="col-md-6">
			<div className="form-group">
			  <label>End Date</label>
			  <DatePicker
			  	dateFormat="YYYY-MM-DD"
				selected={this.state.end_date}
				onChange={this.handleChangeDate}
				/>
			</div>
		  </div>
		</div><br />
		<div className="form-group">
			<ButtonToolbar>
			  <button type="button" onClick={this.handleSubmit} className="btn btn-primary">Add</button>
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
    projects: state.project_reducer.projects,
    users: state.project_reducer.users
  }
}

export default connect(mapStateToProps, actions)(CreateTask);