import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import TableRow from './TableRow';
import CommonDialog from './CommonOverlay';
import DialogBox from './Overlay';
import MultiSelectField from './Multiselect';

class Projects extends Component {
	 constructor(props) {
       super(props);
       this.state = {
       		value: '',
       		projects: '',
       		show: false, 
       		showDelete: false,
       		projectId: null, 
       		alreadyAssociated: {}
		};

		this.mapUsersForSelect = this.mapUsersForSelect.bind(this);
		this.handleShowTeam = this.handleShowTeam.bind(this);
		this.handleShowDelete = this.handleShowDelete.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.resetDialogState = this.resetDialogState.bind(this);
     }
     /* Send AJAX to fetch all Projects along with their users, and show the associated users
        as selected & others available for select.....     
     */
     componentDidMount(){
       axios.get('/project')
       .then(response => {
         this.setState({ projects: response.data.projects, 
         	 users: this.mapUsersForSelect(response.data.users)});
       })
       .catch(function (error) {
         console.log(error);
       })
     }

	/* user array  should contain objects {value, label}  */
	 mapUsersForSelect(data) {
	 	var result = [];
	 	
	 	for (var index in data) {
	 		var tmpObj = data[index];
	 		result.push({value: tmpObj["id"], label:tmpObj["email"]});
	 	}
	 	return result;
	 }

	// This method displays update team dialog.....
     handleShowTeam(projectId){
     	var newstate = Object.assign(this.state);
     	
		var alreadyAssociated = {};
		// also map project associated selected users for dialog to display already selected.....
		for (var index in this.state.projects) {
			var tmpPro = this.state.projects[index];

			if (projectId == tmpPro.id) {
				for (var index2 in tmpPro.users) {
					alreadyAssociated[tmpPro.users[index2].id] = true;
				}
			}
		}
     	newstate.show = true;
     	newstate.projectId = projectId;
     	newstate.alreadyAssociated = alreadyAssociated;
		
     	this.setState(newstate);
     }

	// This method update state to display Delete dialog....
     handleShowDelete(projectId){
     	var newstate = Object.assign(this.state);
     	
     	newstate.showDelete = true;
     	newstate.projectId = projectId;
		
     	this.setState(newstate);
     }

	// This method sends Delete Url request to server.....
	 handleDelete() {
		let uri = `/project/${this.state.projectId}`;
		axios.delete(uri);
		browserHistory.push('/projects');
		
		// also reset all dialogs to Close state......
		this.resetDialogState();
	 }

	// This method sends Delete Url request to server.....
	 resetDialogState() {
     	var newstate = Object.assign(this.state);
     	
     	newstate.showDelete = false;
     	newstate.show = false;
		
     	this.setState(newstate);
	 }

     tabRow(){
       if(this.state.projects instanceof Array){
       	var that = this;
         return this.state.projects.map(function(object, i){
             return <TableRow obj={object} key={i}
             	 handler={that.handleShowTeam} delhandler={that.handleShowDelete}/>;
         })
       }
     }


  render(){
    return (
      <div>
        <h1>Projects</h1>

        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <Link to="/add-project">Create Project</Link>
          </div>
        </div><br/>
        <table className="table table-hover">
            <thead>
				<tr>
					<td>ID</td>
					<td>Name</td>
					<td>Description</td>
					<td>Actions</td>
				</tr>
            </thead>
            <tbody>
              {this.tabRow()}
            </tbody>
        </table>
    	<DialogBox show={this.state.show} title="Update Project Team" projectId={this.state.projectId}
    	 	alreadyAssociated={this.state.alreadyAssociated} users={this.state.users}
    	 	resetDialogState={this.resetDialogState}/>
    	<CommonDialog show={this.state.showDelete} title="Delete Project"
    		body="Are you sure want to Delete this Project! " projectId={this.state.projectId}
    	 	oktitle="Delete" handleOK={this.handleDelete} handleCancel={this.resetDialogState}/>
    </div>
    )
  }
}
export default Projects;
