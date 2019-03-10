import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import networkStrength1 from '../../res/images/fa-network-strength-1.svg';
import networkStrength2 from '../../res/images/fa-network-strength-2.svg';
import networkStrength3 from '../../res/images/fa-network-strength-3.svg';
import networkStrength4 from '../../res/images/fa-network-strength-4.svg';
import networkStrength5 from '../../res/images/fa-network-strength-5.svg';
import networkStrengthUnknown from '../../res/images/fa-network-strength-unknown.svg';

const networkStrengthIcon = [networkStrengthUnknown, networkStrength1, networkStrength2, networkStrength3, networkStrength4, networkStrength5];

const NetworkStrength = ({networkStrength = 0}) => (
	<img src={networkStrengthIcon[networkStrength]}/>
);

NetworkStrength.propTypes = {
	networkStrength: PropTypes.number,
};
const mapStateToProps = state => ({
	networkStrength: state.acReducer.networkStrength,
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NetworkStrength);
