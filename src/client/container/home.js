import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import CardBody from './cardBody';
import CardFooter from './cardFooter';
import CardHeader from './cardHeader';

class Home extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const initialized = this.props.initialized;
		return (
			<div className={`container`} style={{width: '320px', height: '480px'}}>
				<div className={`row h-100`}>
					<div className={`col-md-12`} style={{padding: '0'}}>
						<div className={`card h-100`} style={{backgroundColor: '#f2f2f2'}}>
							<CardHeader/>
							<CardBody/>
							<CardFooter/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Home.propTypes = {
	initialized: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
	initialized: state.acReducer.initialized,
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
