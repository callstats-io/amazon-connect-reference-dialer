import React, {Component} from "react";
import {connect} from "react-redux";

class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="card-header" style={{borderBottom: '0px', backgroundColor: 'inherit'}}>
			</div>
		);
	}
}

Header.propTypes = {
};
const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
