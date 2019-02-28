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
					<div className="col-md-12">
						<a className="btn w-100" style={{height: '36px', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)', backgroundColor: '#3885de', color: '#ffffff', fontFamily: 'AmazonEmber', fontSize: '14px'}} href="#"> Submit</a>
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
