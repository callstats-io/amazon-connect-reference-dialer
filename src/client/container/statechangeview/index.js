import React, {Component} from "react";
import {connect} from "react-redux";

import Header from '../header/index';
import Body from './body';
import Footer from './../footer/statechange';

class StateChangeView extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={`row h-100 border-right border-top border-bottom`}>
				<div className={`col-md-12`} style={{padding: '0'}}>
					<div className={`card h-100`} style={{
						marginRight: '8%',
						boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.2)',
						backgroundColor: '#ffffff'
					}}>
						<Header emptyBody={true}/>
						<Body/>
						<Footer/>
					</div>
				</div>
			</div>
		);
	}
}

StateChangeView.propTypes = {};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StateChangeView);
