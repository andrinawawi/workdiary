import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

class MultiSelectField extends Component {
	 constructor(props) {
		super(props);
		this.state = {
			removeSelected: true,
			disabled: false,
			crazy: false,
			stayOpen: false,
			value: this.props.alreadyAssociated ? Object.keys(this.props.alreadyAssociated) : [],
			rtl: false,
		};

		this.handleSelectChange = this.handleSelectChange.bind(this);
	 }

	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
		
		this.props.updateParent(value);
	}
	
	render () {
		const { crazy, disabled, stayOpen, value } = this.state;
		const options = this.props.options;
		// find all selected users keys

		return (
			<div className="section">
				<Select
					closeOnSelect={!stayOpen}
					disabled={disabled}
					multi
					onChange={this.handleSelectChange}
					options={options}
					placeholder="Select your favourite(s)"
          			removeSelected={this.state.removeSelected}
					rtl={this.state.rtl}
					simpleValue
					value={value}
				/>
			</div>
		);
	}
}

MultiSelectField.displayName = 'MultiSelectField';

MultiSelectField.propTypes = {
	label: PropTypes.string
};

export default MultiSelectField;