
import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../Actions';
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
         console.log("Updated project team ...");
		// navigate to Projects tab again....
		this.props.updateProjectList(true, true);
       })
       .catch(function (error) {
         console.log(error);
       })
       this.setState({ showing: false });
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

export default connect(null, actions)(DialogBox);
