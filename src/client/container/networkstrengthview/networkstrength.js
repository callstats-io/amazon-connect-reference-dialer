import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import SVG from 'react-inlinesvg';
import networkStrength1 from '../../res/images/fa-network-strength-1.svg';
import networkStrength2 from '../../res/images/fa-network-strength-2.svg';
import networkStrength3 from '../../res/images/fa-network-strength-3.svg';
import networkStrength4 from '../../res/images/fa-network-strength-4.svg';
import networkStrength5 from '../../res/images/fa-network-strength-5.svg';

const networkStrengthIcon = [networkStrength1, networkStrength1, networkStrength2, networkStrength3, networkStrength4, networkStrength5];

const NetworkStrength = ({networkStrength}) => (
	<div className={`col-md-2 h-100`}>
		<SVG src={networkStrengthIcon[networkStrength]}/>
	</div>
);

NetworkStrength.propTypes = {
	networkStrength: PropTypes.number.isRequired,
};
const mapStateToProps = state => ({
	networkStrength: state.acReducer.networkStrength || 0,
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NetworkStrength);
