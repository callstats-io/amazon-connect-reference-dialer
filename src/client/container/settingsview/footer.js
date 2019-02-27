import React, {Component} from "react";
import {connect} from "react-redux";
import SVG from 'react-inlinesvg';

import downloadIcon from '../../res/images/fa-download.svg';
import languageIcon from '../../res/images/fa-language.svg';

class Footer extends Component {
	constructor(props) {
		super(props);
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

Footer.propTypes = {};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Footer);