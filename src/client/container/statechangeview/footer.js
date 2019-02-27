import React, {Component} from "react";
import {connect} from "react-redux";


class Footer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="card-footer" style={{backgroundColor: 'inherit', marginRight: '5%', marginLeft: '5%'}}>
				<div className="row">
					<div className="col-md-12">
						<a style={{fontFamily: 'AmazonEmber', color: '#3885de'}} href="#">Log out</a>
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
