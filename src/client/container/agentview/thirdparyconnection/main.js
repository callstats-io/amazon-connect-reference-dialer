import React from "react";
import {connect} from "react-redux";

import UpperBody from './upperBody';
import LowerBody from './lowerBody';

const ThirdPartyConnection = () => (
	<div className={`card-body`}
		 style={{paddingLeft: '0.95em', paddingRight: '0.9em', paddingTop: '0'}}>
		<UpperBody/>
		<LowerBody/>
	</div>
);

ThirdPartyConnection.propTypes = {};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ThirdPartyConnection);
