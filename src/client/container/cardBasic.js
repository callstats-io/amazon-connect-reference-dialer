import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import SVG from 'react-inlinesvg';

import statusChangeIcon from './../res/images/change-status-icon.svg';
import networkStrengthIcon from './../res/images/network-strength-icon.svg';
import dialerSettingIcon from './../res/images/dialer-setting-icon.svg';
import voiceFreqIcon from './../res/images/agent-voice-freq-icon.svg';
import agentMicMutedIcon from './../res/images/muted-icon.svg';
import dialNumberIcon from './../res/images/fa-dial-number.svg';
import quickConnectIcon from './../res/images/fa-quick-connect.svg';


/*
	Basic card body. Mainly the middle part of the whole card.
	It shows
	1. the status, available, offline , muted or something else etc.
	2. the audio volume icon
	3. who I am connected with, and their audio volume
	4. time elapsed in current state
	5.

*/
class CardBasic extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const agentState = this.props.agentState;
		const duration = this.props.duration;
		return (
			<div className={`card-body`}
				 style={{paddingLeft: '0.91em', paddingRight: '0.91em', paddingTop: '0'}}>
				<div className={`row`}
					 style={{height: '182px', backgroundColor: '#3885de', paddingTop: '5%'}}>
					<div className={`col-md-8`}>
						<p className={`m-0`} style={{
							fontFamily: 'AmazonEmber',
							color: '#ffffff',
							fontSize: '28px'
						}}> {agentState} </p>
					</div>
					<div className={`col-md-4 text-center`}>
						<SVG style={{marginLeft: '30%'}}
							 src={voiceFreqIcon}/>
					</div>

					<div className={`col-md-12`}>
						<div className={`row`}>
							<div className={`col-md-2`}>
								<SVG src={agentMicMutedIcon}/>
							</div>
							<div className={`col-md-6 pl-0`}>
								<p style={{fontFamily: 'AmazonEmber', color: '#ffffff'}}> MUTED</p>
							</div>
							<div className={`col-md-4 text-center`}>
								<p style={{fontFamily: 'AmazonEmber', color: '#ffffff', marginLeft: '30%'}}> You</p>
							</div>
						</div>
					</div>

					<div className={`col-md-12`}>
						<div className={`row`}>
							<div className={`col-md-6`}>
								<p className={`m-0`} style={{fontFamily: 'AmazonEmber', color: '#ffffff'}}> With</p>
							</div>
							<div className={`col-md-6 text-right`}>
								<p className={`m-0`} style={{fontFamily: 'AmazonEmber', color: '#ffffff'}}> Time
									elapsed</p>
							</div>
						</div>
					</div>

					<div className={`col-md-12`}>
						<div className={`row`}>
							<div className={`col-md-6`}>
								<p className={`m-0`} style={{fontFamily: 'AmazonEmber', color: '#ffffff'}} > +1 617-401-8889</p>
							</div>
							<div className={`col-md-2 pl-0`}>
								<SVG src={voiceFreqIcon}/>
							</div>
							<div className={`col-md-4 text-right`}>
								<p className={`m-0`} style={{fontFamily: 'AmazonEmber', color: '#ffffff'}}>{duration}</p>
							</div>
						</div>
					</div>

				</div>
			</div>
		);
	}
}

CardBasic.propTypes = {
	agentState: PropTypes.string.isRequired,
	duration: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
	agentState: state.acReducer.agentState || 'unknown',
	duration: state.acReducer.duration || '00:00:00',
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CardBasic);
