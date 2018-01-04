import React, {Component} from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import CommonDialog from './CommonOverlay';
import ReactTable from 'react-table'

import 'react-table/react-table.css'

class Users extends Component {
  constructor(props) {
       super(props);
//        console.log(props);

		this.state = {
			value: '',
			users: '',
       		showDelete: false,
       		projectId: null, 
		};
		this.handleShowDelete = this.handleShowDelete.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.resetDialogState = this.resetDialogState.bind(this);
     }

     componentDidMount(){
       axios.get('/user')
       .then(response => {
         this.setState({ users: response.data });
       })
       .catch(function (error) {
         console.log(error);
       })
     }

     /* Send AJAX to fetch all Projects along with their users, and show the associated users
        as selected & others available for select.....     
     */
     componentDidMount(){
     	this.initializeComponent(this.props);
     }

	/* 
	 refer : https://stackoverflow.com/a/38916204/1331003
	 */
	componentWillReceiveProps(nextProps){
// 		console.log(nextProps);
		// only proceed if change in realod property.....
		if (this.props.reload != nextProps.reload) {
	     	this.initializeComponent(nextProps);
	    }
	}
	
	// Fetch data from server if required .......
	initializeComponent(props) {
     	if (props.reload) {
	     	console.log("INIT  Component USER LIST");

		   axios.get('/user')
		   .then(response => {
			// dispatch action to list users, pass response data......
			props.showUsers({users: response.data});
		   })
		   .catch(function (error) {
			 console.log(error);
		   })
			// also reset all dialogs to Close state......i.e. close all dialogs
			this.resetDialogState();
       }
	}


     userTable(){
     {/*
     Custom Cell react table from https://react-table.js.org/#/story/cell-renderers-custom-components
     */}
		const columns = [
		{
			Header: 'ID',
			accessor: 'id' // String-based value accessors!
		  }, {
			Header: 'Name',
			accessor: 'name',
		  }, {
			Header: 'Email',
			accessor: 'email',
		  }, {
			Header: 'Action',
			accessor: 'id', // Required because our accessor is not a string
			Cell: obj => (
				<span>
					<Link to={"tasks/user/"+obj.value} className="btn btn-primary">Tasks</Link>
					<Link to={"edit-user/"+obj.value} className="btn btn-primary">Edit</Link>
					<input onClick={this.handleShowDelete}  data-id={obj.value} type="button" value="Delete" className="btn btn-danger"/>			
				</span>
			)
		  }];
		  return <ReactTable data={this.props.users} columns={columns}
		  	          defaultPageSize={5} className="-striped -highlight"/>
     }
     
	// This method update state to display Delete user dialog....
     handleShowDelete(event){
     	var userId = event.target.dataset.id;
     	var newstate = Object.assign(this.state);
     	
     	newstate.showDelete = true;
     	newstate.userId = userId;
		
     	this.setState(newstate);
     }

	// This method sends Delete Url request to server.....
	 handleDelete() {
		let uri = `/user/${this.state.userId}`;
		axios.delete(uri)
	   .then(response => {
			// dispatch action to reload list projects....
			that.props.updateUserList(true, true);
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
        <h1>Team Members</h1>

        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <Link to="/add-user">Add User to Team</Link>
          </div>
        </div><br />

		{this.userTable()}

		<CommonDialog show={this.state.showDelete} title="Delete User"
	body="Are you sure want to Delete this user! " userId={this.state.userId}
	oktitle="Delete" handleOK={this.handleDelete} handleCancel={this.resetDialogState}/>

    </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    reload: state.user_reducer.reload,
    users: state.user_reducer.users
  }
}

export default connect(mapStateToProps, actions)(Users);
