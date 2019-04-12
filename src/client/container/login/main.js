import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import Header from './../header/index';
import Body from './body';
import styles from './login.css';

const Login = ({}) => (
	<div className={`row h-100`}>
		<div className={`col-md-12 ${styles.zeroPadding}`}>
			<div className={`card h-100 ${styles.cardBody}`}>
				<Header emptyBody={true}/>
				<Body/>
			</div>
		</div>
	</div>
);

Login.propTypes = {
	initialized: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
	initialized: state.acReducer.initialized,
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
