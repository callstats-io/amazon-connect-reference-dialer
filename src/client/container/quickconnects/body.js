import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import styles from './quickconnects.css';

import {
	onRequestShowQuickConnects,
} from "../../reducers/acReducer";

import CloseQuickConnect from "./close";

class Body extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.close = this.close.bind(this);
	}

	componentDidMount() {

	}

	componentWillUnmount() {
	}

	close() {
		this.props.close();
	}

	render() {
		return (
			<div className={`card-body ${styles.cardBody}`}>
				<CloseQuickConnect close={this.close}/>
			</div>
		);
	}
}

Body.propTypes = {
	close: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	close: () => {
		dispatch(onRequestShowQuickConnects('close'));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Body);
