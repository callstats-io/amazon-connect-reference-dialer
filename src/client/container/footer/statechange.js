import React, {Component} from "react";
import {connect} from "react-redux";

const logoutURL = 'https://callstatsio.awsapps.com/connect/logout';
class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedOut: false,
		};
	}

	logout() {
		this.setState({
			loggedOut: true
		});
		window.location.reload();
	}

	render() {
		return (
			<div className="card-footer" style={{backgroundColor: 'inherit', marginRight: '5%', marginLeft: '5%'}}>
				<div className="row">
					<div className="col-md-12" onClick={this.logout} style={{cursor: 'pointer'}}>
						<a style={{fontFamily: 'AmazonEmber', color: '#3885de'}}>Log out</a>
					</div>
				</div>
				<div style={{display: 'none'}}>
					{this.state.loggedOut && <iframe src={logoutURL}/>}
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
