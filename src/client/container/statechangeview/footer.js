import React, {Component} from "react";

const logoutURL = 'https://callstatsio.awsapps.com/connect/logout';

const mainFooter = {
	backgroundColor: 'inherit',
	marginRight: '5%',
	marginLeft: '5%'
};

const pointer = {
	cursor: 'pointer',
};

const link = {
	fontFamily: 'AmazonEmber',
	color: '#3885de'
};

const displayNone = {
	display: 'none'
};

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
			<div className="card-footer" style={mainFooter}>
				<div className="row">
					<div className="col-md-12" onClick={this.logout} style={pointer}>
						<a style={link}>Log out</a>
					</div>
				</div>
				<div style={displayNone}>
					{this.state.loggedOut && <iframe src={logoutURL}/>}
				</div>
			</div>
		);
	}
}


export default Footer;
