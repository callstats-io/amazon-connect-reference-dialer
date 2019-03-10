import React from "react";
import PropTypes from "prop-types";

const Footer = ({submitIssue}) => (
	<div className="card-footer" style={{backgroundColor: '#ffffff', borderTop: 0}}>
		<div className="row">
			<div className="col-md-12">
				<a className="btn w-100"
				   style={{
					   height: '36px',
					   boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
					   backgroundColor: '#3885de',
					   color: '#ffffff',
					   fontFamily: 'AmazonEmber',
					   fontSize: '14px'
				   }}
				   href="#"
				   onClick={submitIssue}> Submit</a>
			</div>
		</div>
	</div>
);
Footer.propTypes = {
	submitIssue: PropTypes.func.isRequired
};
export default Footer;
