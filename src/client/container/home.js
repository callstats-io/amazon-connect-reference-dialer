import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import SVG from 'react-inlinesvg';

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
						<div className={`card h-100`}>
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
							<div className={`card-body`}
								 style={{paddingLeft: '0.91em', paddingRight: '0.91em', paddingTop: '0'}}>
								<div className={`row`}
									 style={{height: '172px', backgroundColor: '#3885de', paddingTop: '5%'}}>
									<div className={`col-md-6`}>
										<p style={{
											fontFamily: 'AmazonEmber',
											color: '#ffffff',
											fontSize: '28px'
										}}> Available</p>
									</div>
									<div className={`col-md-6`}>
										<div className={`row`}>
											<div className={`col-md-12`}>
												<div className={`row`}>
													<div className={`col-md-4`}></div>
													<div className={`col-md`}>
														<SVG src={agentVoiceFreqIcon}/>
													</div>
												</div>
											</div>
										</div>
										<div className={`row`} style={{marginTop: '10%'}}>
											<div className={`col-md-12`}>
												<div className={`row`}>
													<div className={`col-md-5`}></div>
													<div className={`col-md`}>
														<p style={{
															fontFamily: 'AmazonEmber',
															color: '#ffffff',
															fontSize: '12px'
														}}> You</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className={`row`} style={{marginTop: '5%'}}>
									<div className={`col-md-12`}>
										<div className={`row`}>
											<div className={`col-md-6`}><a className={`btn`} style={{
												width: '132px',
												height: '36px',
												boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
												backgroundColor: '#ffffff',
												color: '#000000',
												fontFamily: 'AmazonEmber',
												fontSize: '14px'
											}} href="#">
												<SVG src={dialNumberIcon}/> &nbsp;Dial number </a>
											</div>
											<div className={`col-md-6`}><a className={`btn pl-0 pr-0`} href="#" style={{
												width: '132px',
												height: '36px',
												boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
												backgroundColor: '#ffffff',
												color: '#000000',
												fontFamily: 'AmazonEmber',
												fontSize: '14px'
											}}>
												<SVG src={quickConnectIcon}/> &nbsp;Quick connect </a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className={`card-footer`} style={{backgroundColor: 'inherit', borderTop: '0'}}>
								<div className={`row`}>
									<div className={`col-md-12`}><a className={`btn w-100`} style={{
										height: '36px',
										boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
										backgroundColor: '#3885de',
										color: '#ffffff',
										fontFamily: 'AmazonEmber',
										fontSize: '14px'
									}} href="#"> Set to Available </a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Home.propTypes = {
	initialized: PropTypes.bool.isRequired,
	agentState: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
	initialized: state.login.initialized,
	agentState: state.login.agentState || 'offline',
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
