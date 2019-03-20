import React from "react";
import {connect} from "react-redux";


const ConferenceConnection = () => (
	<div className={`card-body`}
		 style={{paddingLeft: '0.95em', paddingRight: '0.9em', paddingTop: '0'}}>
		<h2> Multiparty call </h2>
	</div>
);

ConferenceConnection.propTypes = {};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ConferenceConnection);
