import React, {Component} from "react";
import {connect} from "react-redux";
import SVG from 'react-inlinesvg';

import downloadIcon from '../../res/images/fa-download.svg';
import languageIcon from '../../res/images/fa-language.svg';
import PropTypes from "prop-types";
import {onRequestConnectivityCheck} from "../../reducers/acReducer";

class Footer extends Component {
	constructor(props) {
		super(props);
	}

	requestConnectivityCheck() {
		this.props.requestConnectivityCheck();
	}

	render() {
		return (
			<div className="card-footer" style={{backgroundColor: '#ffffff', borderTop: 0}}>
				<div className="row">
					<div className="col-md-6 p-0">
						<a className="btn align-self-left text-left" href="#"
						   style={{color: '#3885de', fontFamily: 'AmazonEmber', fontSize: '14px'}}> Report a call
							issue </a>
					</div>
					<div className="col-md-6 p-0">
						<a className="btn text-left" href="#"
						   style={{color: '#3885de', fontFamily: 'AmazonEmber', fontSize: '14px'}}>
							<SVG  src={downloadIcon}/> Download logs </a>
					</div>
					<div className="col-md-6 p-0">
						<a className="btn text-left" href="#"
						   onClick={()=> this.requestConnectivityCheck() }
						   style={{color: '#3885de', fontFamily: 'AmazonEmber', fontSize: '14px'}}> Connectivity
							check </a>
					</div>
					<div className="col-md-6 p-0">
						<a className="btn text-left" href="#"
						   style={{color: '#3885de', fontFamily: 'AmazonEmber', fontSize: '14px'}}>
							<SVG  src={languageIcon}/> English </a>
					</div>
				</div>
			</div>
		);
	}
}

Footer.propTypes = {
	requestConnectivityCheck: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
	requestConnectivityCheck: () => {
		dispatch(onRequestConnectivityCheck('pending'))
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Footer);
