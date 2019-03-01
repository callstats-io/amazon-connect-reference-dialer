import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Header from '../common/header';
import Body from './body';
import Footer from './footer';

class ConnectivityCheckView extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const initialized = this.props.initialized;
		return (
			initialized &&
			<div className={`row h-100`}>
				<div className={`col-md-12`} style={{padding: '0'}}>
					<div className={`card h-100`} style={{backgroundColor: '#f2f2f2'}}>
						<Header/>
						<Body/>
						<Footer/>
					</div>
				</div>
			</div>

		);
	}
}

ConnectivityCheckView.propTypes = {
	initialized: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
	initialized: state.acReducer.initialized,
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ConnectivityCheckView);
