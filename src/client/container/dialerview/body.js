import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import ReactPhoneInput from 'react-phone-input-2';

import closeOrDismissIcon from '../../res/images/fa-close-or-dismiss.svg';

import {
	onRequestShowDialPad
} from "../../reducers/acReducer";

import agentConfigManager from './../../api/agentConfigManager';
import DialPad from './dialpad';
import lo from 'lodash';


class Body extends Component {
	constructor(props) {
		super(props);
		this.dialableCountries = agentConfigManager.getDialableCountries();
		this.state = {
			phoneNumber: '',
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.numPadHandler = this.numPadHandler.bind(this);
	}

	closeDialPad() {
		this.props.closeDialPad();
	}

	handleInputChange(value) {
		this.setState({
			phoneNumber: value
		});
	}

	numPadHandler(...argv) {
		const value = lo.first(argv, null);
		if (!value) {
			return
		}
		const {phoneNumber} = this.state;
		console.warn('->', phoneNumber, value);
		this.setState({
			phoneNumber: `${phoneNumber}${value}`
		})
	}

	render() {
		const handleChange = this.handleInputChange;
		return (
			<div className="card-body" style={{backgroundColor: '#ffffff'}}>
				<div className="row">
					<div className="col-md-10">
						<span style={{color: '#000000', fontSize: '18px', fontFamily: 'AmazonEmber'}}>Dial number</span>
					</div>
					<div className="col-md-2"
						 onClick={() => this.closeDialPad()}>
						<img src={closeOrDismissIcon} style={{cursor: 'pointer'}}/>
					</div>
				</div>
				<div className="row mt-2">
					<div className="col-md-9">
						<ReactPhoneInput inputStyle={{minWidth: '15.5em', maxWidth: '15.5em'}}
										 onlyCountries={this.dialableCountries}
										 enableSearchField={true}
										 value={this.state.phoneNumber}
										 onChange={this.handleInputChange}/>
					</div>
					<div className="col-md-3 p-0 m-0">
						<a href="#" className="btn" style={{
							backgroundColor: '#a3acb6',
							fontFamily: 'AmazonEmber',
							color: '#ffffff',
							height: '35px',
							lineHeight: '1.3em',
						}}>
							Dial
						</a>
					</div>
				</div>
				<div className="row mt-4">
					<DialPad numPadHandler={this.numPadHandler}/>
				</div>
			</div>
		);
	}
}

Body.propTypes = {
	closeDialPad: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
	closeDialPad: () => {
		dispatch(onRequestShowDialPad('close'));
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Body);
