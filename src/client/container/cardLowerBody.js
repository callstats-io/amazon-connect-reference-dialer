import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import SVG from 'react-inlinesvg';

import holdIcon from './../res/images/fa-hold.svg';
import muteIcon from './../res/images/fa-mute.svg';
import micIcon from './../res/images/fa-mic.svg';
import dialNumberIcon from './../res/images/fa-dial-number.svg';
import quickConnect from './../res/images/fa-quick-connect.svg';
import transferIcon from './../res/images/fa-transfer.svg';


/*
	Card lower body. Mainly the lower part of the card body.
	It shows
	1. hold
	2. mute
	3. dial number
	4. quick connect
*/

class CardLowerBody extends Component {
	constructor(props) {
		super(props);
	}

	_holdOrMute(agentState = null) {
		return ['Connected'].includes(agentState);
	}

	_transferCall(agentState = null) {
		return ['Connected'].includes(agentState);
	}

	_quickConnect(agentState = null) {
		return ['Connected'].includes(agentState) === false;
	}

	_dialOrQuickConnect(agentState = null) {
		return ['Inbound Call', 'Outbound Call'].includes(agentState) === false;
	}

	render() {
		const agentState = this.props.agentState;

		//todo should come from API
		const muted = this.props.muted;

		return (
			<div className="row">
				<div className="col-md-12">
					{
						this._holdOrMute(agentState) &&
						<div className="row mt-3">
							<div className="col-md-6"><a className="btn" style={{
								width: '132px',
								height: '36px',
								boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
								backgroundColor: '#ffffff',
								color: '#000000',
								fontFamily: 'AmazonEmber',
								fontSize: '14px'
							}} href="#">
								<SVG src={holdIcon}/> &nbsp;Hold </a>
							</div>
							<div className="col-md-6"><a className="btn pl-0 pr-0" href="#" style={{
								width: '132px',
								height: '36px',
								boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
								backgroundColor: '#ffffff',
								color: '#000000',
								fontFamily: 'AmazonEmber',
								fontSize: '14px'
							}}>
								<img src={micIcon}/> &nbsp;Mute </a>
							</div>
						</div>
					}
					{
						this._dialOrQuickConnect(agentState) &&
						<div className="row mt-3">
							<div className="col-md-6"><a className="btn" style={{
								width: '132px',
								height: '36px',
								boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
								backgroundColor: '#ffffff',
								color: '#000000',
								fontFamily: 'AmazonEmber',
								fontSize: '14px'
							}} href="#">
								<img src={dialNumberIcon}/> &nbsp;Dial number </a>
							</div>

							{
								this._transferCall(agentState) &&
								<div className="col-md-6"><a className="btn pl-0 pr-0" href="#" style={{
									width: '132px',
									height: '36px',
									boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
									backgroundColor: '#ffffff',
									color: '#000000',
									fontFamily: 'AmazonEmber',
									fontSize: '14px'
								}}>
									<img src={transferIcon}/> &nbsp;Transfer </a>
								</div>
							}
							{
								this._quickConnect(agentState) &&
								<div className="col-md-6"><a className="btn pl-0 pr-0" href="#" style={{
									width: '132px',
									height: '36px',
									boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
									backgroundColor: '#ffffff',
									color: '#000000',
									fontFamily: 'AmazonEmber',
									fontSize: '14px'
								}}>
									<img src={quickConnect}/> &nbsp;Quick connect </a>
								</div>
							}

						</div>
					}
				</div>
			</div>
		);
	}
}

CardLowerBody.propTypes = {
	agentState: PropTypes.string.isRequired,
	muted: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
	agentState: state.acReducer.agentState || 'unknown',
	muted: state.acReducer.muted || false,
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CardLowerBody);
