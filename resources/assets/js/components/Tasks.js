import React, {Component} from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import TableRowTask from './TableRowTask';
import CommonDialog from './CommonOverlay';

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
     	this.initializeComponent(this.props);
     }

		/* this is needed to load /tasks & /tasks/project/id both
		 refer : https://stackoverflow.com/a/38916204/1331003
		 */
	  componentWillReceiveProps(nextProps){
		 // send new props to update state and invoke re-render of component.....
		if (this.props.route.path != nextProps.route.path) {
	     	this.initializeComponent(nextProps);
	     }
	  }
	  
	  initializeComponent(props) {
     	var taskFetchUri = '/task';
     	
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
       axios.get(taskFetchUri)
       .then(response => {
         this.setState({
          tasks: response.data.tasks,
		});
       })
       .catch(function (error) {
         console.log(error);
       })	  
	  }

     tabRow(){
       if(this.state.tasks instanceof Array){
         var that = this;

         return this.state.tasks.map(function(object, i){
             return <TableRowTask obj={object} key={i} delhandler={that.handleShowDelete}/>;
         })
       }
     }
     
	// This method update state to display Delete task dialog....
     handleShowDelete(taskId){
     	// setState is shallow merge only......
     	this.setState({showDelete: true, taskId: taskId});
     }

	// This method sends Delete Url request to server.....
	 handleDelete() {
		let uri = `/task/${this.state.taskId}`;
		axios.delete(uri);
		browserHistory.push('/tasks');
		
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

        <table className="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Description</td>
                <td>Status</td>
                <td>Assignee</td>
                <td>Actions</td>
            </tr>
            </thead>
            <tbody>
              {this.tabRow()}
            </tbody>
        </table>
		<CommonDialog show={this.state.showDelete} title="Delete Task"
	body="Are you sure want to Delete this task! " taskId={this.state.taskId}
	oktitle="Delete" handleOK={this.handleDelete} handleCancel={this.resetDialogState}/>

    </div>
    )
  }
}

Tasks.defaultProps = {
}

export default Tasks;