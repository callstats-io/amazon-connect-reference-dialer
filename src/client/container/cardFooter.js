import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import SVG from 'react-inlinesvg';

import dialButton from './../res/images/fa-dial-button.svg';

class CardFooter extends Component {
	constructor(props) {
		super(props);
	}

	_setAvailable(agentState = null) {
		return agentState && agentState.toLowerCase() !== 'available' &&
			!this._endCall(agentState) &&
			!this._acceptRejectCall(agentState);
	}

	_endCall(agentState = null) {
		return ['Connected', 'Outbound Call', 'On hold'].includes(agentState);
	}

	_acceptRejectCall(agentState = null) {
		return ['Inbound Call'].includes(agentState)
	}

	render() {
		const agentState = this.props.agentState;

		return (
			<div className="card-footer" style={{backgroundColor: 'inherit', borderTop: 0}}>
				{
					this._setAvailable(agentState) &&
					<div className="row">
						<div className="col-md-12">
							<a className="btn w-100" style={{
								height: '36px',
								boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
								backgroundColor: '#3885de',
								color: '#ffffff',
								fontFamily: 'AmazonEmber',
								fontSize: '14px'
							}} href="#"> Set to Available </a>
						</div>
					</div>
				}
				{
					this._endCall(agentState) &&
					<div className="row">
						<div className="col-md-12">
							<a className="btn w-100" style={{
								height: '36px',
								boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
								backgroundColor: '#c91922',
								color: '#ffffff',
								fontFamily: 'AmazonEmber',
								fontSize: '14px'
							}} href="#">
								<SVG src={dialButton}/>&nbsp;End call </a>
						</div>
					</div>
				}
				{
					this._acceptRejectCall(agentState) &&
					<div className="row">
						<div className="col-md-6"><a className="btn" style={{
							height: '36px',
							boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
							backgroundColor: '#0e9526',
							fontFamily: 'AmazonEmber',
							textAlign: 'center',
							color: '#ffffff'
						}} href="#"> Accept call</a></div>
						<div className="col-md-6"><a className="btn" style={{
							height: '36px',
							boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
							backgroundColor: '#c91922',
							fontFamily: 'AmazonEmber',
							fontWeight: 'normal',
							fontStyle: 'normal',
							fontStretch: 'normal',
							lineHeight: 'normal',
							letterSpacing: 'normal',
							textAlign: 'center',
							color: '#ffffff'
						}} href="#">
							<SVG src={dialButton}/>&nbsp;Reject call</a></div>
					</div>
				}
			</div>
		);
	}
}

CardFooter.propTypes = {
	agentState: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
	agentState: state.acReducer.agentState || 'unknown',
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CardFooter);
