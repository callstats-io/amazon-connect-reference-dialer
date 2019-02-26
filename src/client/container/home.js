import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import SVG from 'react-inlinesvg';
import CardBasic from './cardBasic';
import CardFooter from './cardFooter';

import statusChangeIcon from './../res/images/change-status-icon.svg';
import networkStrengthIcon from './../res/images/network-strength-icon.svg';
import dialerSettingIcon from './../res/images/dialer-setting-icon.svg';
import agentVoiceFreqIcon from './../res/images/agent-voice-freq-icon.svg';
import dialNumberIcon from './../res/images/fa-dial-number.svg';
import quickConnectIcon from './../res/images/fa-quick-connect.svg';


class Home extends Component {
	constructor(props) {
		super(props);
	}

	changeAgentStatus() {

	}

	render() {
		const initialized = this.props.initialized;
		return (
			initialized &&
			<div className={`container`} style={{width: '320px', height: '480px'}}>
				<div className={`row h-100`}>
					<div className={`col-md-12`} style={{padding: '0'}}>
						<div className={`card h-100`} style={{backgroundColor: '#f2f2f2'}}>
							<div className={`card-header`} style={{backgroundColor: '#2c6cb4', height: '48px'}}>
								<div className={`row h-100`}>
									<div className={`col-md-5 h-100`} style={{paddingRight: '0px', cursor: 'pointer'}}
										 onClick={this.changeAgentStatus()}>
										<p style={{fontFamily: 'AmazonEmber', color: '#ffffff'}}>Change status</p>
									</div>
									<div className={`col-md-3 h-100`} style={{cursor: 'pointer'}}
										 onClick={this.changeAgentStatus()}>
										<SVG src={statusChangeIcon}/>
									</div>
									<div className={`col-md-2 h-100`}>
										<SVG src={networkStrengthIcon}/>
									</div>
									<div className={`col-md-2 border-left`}>
										<SVG src={dialerSettingIcon}/>
									</div>
								</div>
							</div>
							<CardBasic/>
							<CardFooter/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Home.propTypes = {
	initialized: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
	initialized: state.acReducer.initialized,
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
