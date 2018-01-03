import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import Select from 'react-select';
import { ButtonToolbar, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../Actions';

import 'react-datepicker/dist/react-datepicker.css';

class EditTask extends Component {
  constructor(props){
    super(props);

    this.state = {
    		description: '',
    		status: 'ToDo',
    		end_date: moment(),
    		assigned_user_id:'',
    		project_id: '',
    		statusarr: [
    				{value: 'ToDo', label: 'ToDo'},
    				{value: 'Done', label: 'Done'},
    				{value: 'Working', label: 'Working'}
    			]
    	};

	this.mapUsersForSelectComponent = this.mapUsersForSelectComponent.bind(this);
	this.mapProjectsForSelectComponent = this.mapProjectsForSelectComponent.bind(this);
    this.handleChangeDesc = this.handleChangeDesc.bind(this);
    this.handleChangeProject = this.handleChangeProject.bind(this);
    this.handleChangeAssignee = this.handleChangeAssignee.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  
  // fetch task details from server....
  // also fetch projects, users from server (Until Redux is applied)
  componentDidMount(){
    axios.get(`/task/${this.props.params.id}/edit`)
    .then(response => {
      this.props.editTask(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
		console.log("EDIT TASK MOUNTED, update state");
  }

	componentWillReceiveProps(nextProps){
		console.log("EDIT TASK PROPS RECEIVED, update state");
		console.log(nextProps);
		// only proceed if change in realod property.....
		if (this.props.description != nextProps.description ||
			this.props.status != nextProps.status ||
			this.props.end_date != nextProps.end_date ||
			this.props.assigned_user_id != nextProps.assigned_user_id ||
			this.props.project_id != nextProps.project_id) {
				this.setState({
					description: nextProps.description,
					project_id: nextProps.project_id,
					assigned_user_id: nextProps.assigned_user_id,
					status: nextProps.status, 
					end_date: nextProps.end_date ? moment(nextProps.end_date) : null,
					projects: this.mapProjectsForSelectComponent(nextProps.projects),
					users: this.mapUsersForSelectComponent(nextProps.users)
				});
		}
	}

	componentWillUpdate(nextProps, nextState) {
		console.log("EDIT TASK COmp will update");
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
  handleChangeStatus(selectedOption){
    this.setState({
      status: selectedOption.value
    });
  }

  handleChangeDate(dateVal){
    this.setState({
      end_date: dateVal
    });
  }

  // Send POST to update task 
  handleSubmit(e){
    e.preventDefault();
    const data = {
      description: this.state.description,
      assigned_user_id: this.state.assigned_user_id,
      project_id: this.state.project_id,
      end_date: this.state.end_date ? this.state.end_date.format("YYYY-MM-DD") : '',
      status: this.state.status,
    }
    let uri = '/task/'+this.props.params.id;
    // Send POST server 
    axios.patch(uri, data).then((response) => {
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
    	console.log("Edit task render....");
    
      return (
      <div>
        <h1>Update Task</h1>
        <form>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Description *</label>
                <input type="text" required className="form-control"
                	 onChange={this.handleChangeDesc} value={this.state.description}/>
              </div>
            </div>
		</div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Status</label>
                	<Select required
						name="status"
						value={this.state.status}
						onChange={this.handleChangeStatus}
						options={this.state.statusarr}
					  />
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
			  <button type="button" onClick={this.handleSubmit} className="btn btn-primary">Edit</button>
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
    description: state.edit_task_reducer.description,
    status: state.edit_task_reducer.status,
    end_date: state.edit_task_reducer.end_date,
    assigned_user_id: state.edit_task_reducer.assigned_user_id,
    project_id: state.edit_task_reducer.project_id,
    projects: state.project_reducer.projects,
    users: state.project_reducer.users
  }
}

export default connect(mapStateToProps, actions)(EditTask);
