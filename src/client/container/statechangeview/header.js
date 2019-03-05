import React, {Component} from "react";
import {connect} from "react-redux";

const Header = ({}) => (
	<div className="card-header" style={{borderBottom: '0px', backgroundColor: 'inherit'}}/>
);

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
