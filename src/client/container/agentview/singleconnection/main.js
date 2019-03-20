import React from "react";
import {connect} from "react-redux";


const SingleConnection = () => (
	<div className={`card-body`}
		 style={{paddingLeft: '0.95em', paddingRight: '0.9em', paddingTop: '0'}}>
		<h2> Single call </h2>
	</div>
);

SingleConnection.propTypes = {};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SingleConnection);
