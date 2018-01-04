import React, {Component} from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import CommonDialog from './CommonOverlay';
import * as actions from '../Actions';
import ReactTable from 'react-table'

import 'react-table/react-table.css'

/* This is main task listing component. It is used to display all tasks
 and task specific to a Project or a User.....*/
class Tasks extends Component {
  constructor(props) {
       super(props);

		console.log(props);
		this.state = {
			value: '',
			tasks: '',
       		showDelete: false,
       		taskId: null, 
		};
		this.handleShowDelete = this.handleShowDelete.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.resetDialogState = this.resetDialogState.bind(this);
     }

     componentDidMount(){
//      	console.log(" tasks list mounted");
     	this.initializeComponent(this.props);
     }

		/* this is needed to load /tasks & /tasks/project/id both
		 refer : https://stackoverflow.com/a/38916204/1331003
		 */
	  componentWillReceiveProps(nextProps){
		 // send new props to update state and invoke re-render of component.....
		 if (this.props.route.path != nextProps.route.path ||
			this.props.reload != nextProps.reload) {
	     	this.initializeComponent(nextProps);
	     }
	  }
	  
	  initializeComponent(props) {
     	var taskFetchUri = '/task';
     	var that = this;
     	
     	// fetch tasks from depending on url...
     	if (props.route.path.match("project")) {
     		console.log("is Project");
     		taskFetchUri = '/project/'+props.params.id+'/tasks';
     	} else if (props.route.path.match("user")) {
     		console.log("is User");
     		taskFetchUri = '/user/'+props.params.id+'/tasks';
     	} else {
     		console.log("is Normal");
     	}
     	if (props.reload) {
	     	console.log("INIT  Component TASK list");

		   axios.get(taskFetchUri)
		   .then(response => {
				props.showTasks({ tasks: response.data.tasks});
		   })
		   .catch(function (error) {
			 console.log(error);
		   })
		}
	  }

     taskTable(){
     {/*
     Custom Cell react table from https://react-table.js.org/#/story/cell-renderers-custom-components
     */}
		const columns = [
		{
			Header: 'ID',
			accessor: 'id' // String-based value accessors!
		  }, {
			Header: 'Description',
			accessor: 'description',
		  }, {
			Header: 'Status',
			accessor: 'status',
		    Cell: props => <span className={props.value.toString().toLowerCase()}>{props.value}</span> // Custom cell components!
		  }, {
			Header: 'Assignee',
			accessor: 'user.email',
		  }, {
			Header: 'Action',
			accessor: 'id', // Required because our accessor is not a string
			Cell: obj => (
				<span>
					<Link to={"edit-task/"+obj.value} className="btn btn-primary">Edit</Link>
					<input onClick={this.handleShowDelete}  data-id={obj.value} type="button" value="Delete" className="btn btn-danger"/>			
				</span>
			)
		  }];
		  return <ReactTable data={this.props.tasks} columns={columns}
		  	          defaultPageSize={5} className="-striped -highlight"/>
     }

     tabRow(){
       if(this.props.tasks instanceof Array){
         var that = this;

         return this.props.tasks.map(function(object, i){
             return <TableRowTask obj={object} key={i} delhandler={that.handleShowDelete}/>;
         })
       }
     }
     
	// This method update state to display Delete task dialog....
     handleShowDelete(event){
     	var taskId = event.target.dataset.id;
     	// setState is shallow merge only......
     	this.setState({showDelete: true, taskId: taskId});
     }

	// This method sends Delete Url request to server.....
	 handleDelete() {
	 	var that = this;
		let uri = `/task/${this.state.taskId}`;

		axios.delete(uri)
	   .then(response => {
			// dispatch action to reload task listing....
			that.props.updateTaskList(true, true);
	   })
	   .catch(function (error) {
		 console.log(error);
	   })
		
		// also reset all dialogs to Close state......
		this.resetDialogState();
	 }
     
	// This method sends Delete Url request to server.....
	 resetDialogState() {
     	var newstate = Object.assign(this.state);
     	
     	newstate.showDelete = false;
		
     	this.setState(newstate);
	 }

  render(){
    return (
      <div>
        <h1>Tasks</h1>

        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <Link to="/add-task">Add Task</Link>
          </div>
        </div><br />

		{this.taskTable()}

		<CommonDialog show={this.state.showDelete} title="Delete Task (Only Assigned user can delete the task)"
	body="Are you sure want to Delete this task! " taskId={this.state.taskId}
	oktitle="Delete" handleOK={this.handleDelete} handleCancel={this.resetDialogState}/>

    </div>
    )
  }
}

Tasks.defaultProps = {
}

const mapStateToProps = state => {
  return {
    reload: state.task_reducer.reload,
    projects: state.project_reducer.projects,
    users: state.project_reducer.users,
    tasks: state.task_reducer.tasks
  }
}

export default connect(mapStateToProps, actions)(Tasks);
