import React, {Component} from "react";
import {connect} from "react-redux";
import CardUpperBody from './cardUpperBody'
import CardLowerBody from './cardLowerBody'


class CardBody extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className={`card-body`}
				 style={{paddingLeft: '0.95em', paddingRight: '0.95em', paddingTop: '0'}}>
				<CardUpperBody/>
				<CardLowerBody/>
			</div>
		);
	}
}

CardBody.propTypes = {

};
const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CardBody);
