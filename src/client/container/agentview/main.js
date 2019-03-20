import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Header from '../header/index';

import SingleConnection from './singleconnection/index';
import ConferenceConnection from './conferenceconnection/index';
import Footer from './footer';

const isSingle = (currentState = undefined) => {
	return currentState && !currentState.thirdPartyConnectionState;
};

const AgentView = ({initialized = false, currentState = undefined}) => (
	initialized &&
	<div className={`row h-100`}>
		<div className={`col-md-12`} style={{padding: '0'}}>
			<div className={`card h-100`} style={{backgroundColor: '#f2f2f2'}}>
				<Header/>
				{isSingle(currentState) ? <SingleConnection/> : <ConferenceConnection/>}
				<Footer/>
			</div>
		</div>
	</div>
);

AgentView.propTypes = {
	initialized: PropTypes.bool.isRequired,
	currentState: PropTypes.object,
};
const mapStateToProps = state => ({
	initialized: state.acReducer.initialized,
	currentState: state.acReducer.currentState,
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AgentView);
