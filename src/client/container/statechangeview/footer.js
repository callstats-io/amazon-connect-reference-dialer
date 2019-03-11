import React, {Component} from "react";

const logoutURL = 'https://callstatsio.awsapps.com/connect/logout';

class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedOut: false,
		};
		this.logout = this.logout.bind(this);
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


export default Footer;