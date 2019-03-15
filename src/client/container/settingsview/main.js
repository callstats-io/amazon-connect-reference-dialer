import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Header from './header';
import Body from './body';
import Footer from './footer';

const zeroPadding = {
	padding: '0',
};

const cardBody = {
	backgroundColor: '#f2f2f2',
};

class SettingPageView extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const initialized = this.props.initialized;
		return (
			initialized &&
			<div className={`row h-100`}>
				<div className={`col-md-12`} style={zeroPadding}>
					<div className={`card h-100`} style={cardBody}>
						<Header/>
						<Body/>
						<Footer/>
					</div>
				</div>
			</div>

		);
	}
}

SettingPageView.propTypes = {
	initialized: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
	initialized: state.acReducer.initialized,
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SettingPageView);
