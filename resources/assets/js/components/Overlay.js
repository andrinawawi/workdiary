// var Modal = require('react-bootstrap').Modal;
// var Button = require('react-bootstrap').Button;

import React, {Component} from 'react';
// import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';
// import TableRow from './TableRow';

// import React from 'react';
// import createClass from 'create-react-class';
// import PropTypes from 'prop-types';
// import Select from 'react-select';
import MultiSelectField from './Multiselect';

class DialogBox extends Component {

	 constructor(props) {
		super(props);
		this.state = {showing: this.props.show, users: []};

		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.save = this.save.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
	 }

	 componentWillReceiveProps(nextProps) {
		if(nextProps.value !== this.props.show) {
		  this.setState({showing: nextProps.show});
		}
	}
  
	close() {
       this.setState({ showing: false });
       this.props.resetDialogState();
    }

	open() {
	   this.setState({ showing: true });
	}

	save() {
		// send POST AJAX to update team members 
       axios.post(`project/${this.props.projectId}/update_users`, { users: this.state.users})
       .then(response => {
         console.log("Updated users ...");
//          this.setState({ projects: response.data.projects, 
//          	 users: this.mapUsersForSelect(response.data.users)});
       })
       .catch(function (error) {
         console.log(error);
       })
       this.setState({ showing: false });
       // navigate to Projects tab again....
// 	   browserHistory.push('/projects');
    }
    
	handleSelectChange (value) {
		console.log('You selected is :', value);
		
		this.setState({ showing: true, users: value });
	}

    render() {
        return (
            <div>
				<Modal show={this.state.showing} onHide={this.close}>
					<Modal.Header closeButton>
						{this.props.title}
					</Modal.Header>
					<Modal.Body>
						<MultiSelectField options={this.props.users}
							updateParent={this.handleSelectChange}
							alreadyAssociated={this.props.alreadyAssociated}/>
					 </Modal.Body>
					 <Modal.Footer>
						<Button bsStyle="primary" onClick={this.save}>Save</Button>
						<Button onClick={this.close}>Cancel</Button>
					 </Modal.Footer>
				 </Modal>
			 </div>
             );
         }
}

DialogBox.defaultProps = {show: false};

export default DialogBox;
