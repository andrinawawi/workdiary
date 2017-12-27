// var Modal = require('react-bootstrap').Modal;
// var Button = require('react-bootstrap').Button;

import React, {Component} from 'react';
// import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

class CommonDialog extends Component {

	 constructor(props) {
		super(props);
		this.state = {showing: this.props.show};

		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.handleOK = this.handleOK.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	 }

	 componentWillReceiveProps(nextProps) {
		if(nextProps.value !== this.props.show) {
		  this.setState({showing: nextProps.show});
		}
	}

	close() {
       this.setState({ showing: false });
    }

	open() {
	   this.setState({ showing: true });
	}
    
	handleOK() {
		console.log('You selected OK :');
		this.setState({ showing: false });
		
		// call given handler if any....
		if (this.props.handleOK)
			this.props.handleOK();
	}

	handleCancel() {
		console.log('You selected Cancel:');
		this.setState({ showing: false });

		// call given handler if any....
		if (this.props.handleCancel)
			this.props.handleCancel();
	}

    render() {
        return (
            <div>
				<Modal show={this.state.showing} onHide={this.close}>
					<Modal.Header closeButton>
						{this.props.title}
					</Modal.Header>
					<Modal.Body>
						{this.props.body}
					 </Modal.Body>
					 <Modal.Footer>
						<Button bsStyle="primary" onClick={this.handleOK}>{this.props.oktitle}</Button>
						<Button onClick={this.handleCancel}>{this.props.canceltitle}</Button>
					 </Modal.Footer>
				 </Modal>
			 </div>
             );
         }
}

CommonDialog.defaultProps = {
	show: false,
	title: "Information",
	body: "Are you sure?",
	oktitle: "OK",
	canceltitle: "Cancel",
	handleCancel: null,
	handleOK: null
};

export default CommonDialog;
