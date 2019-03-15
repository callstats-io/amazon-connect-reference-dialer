import React, {Component} from "react";

import styles from './statuschange.css';

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
			<div className={`card-footer ${styles.acFooter}`}>
				<div className="row">
					<div className="col-md-12" onClick={this.logout}>
						<a className={`${styles.acLink} ${styles.acPointer}`}>Log out</a>
					</div>
				</div>
				<div className={`${styles.acNoDisplay}`}>
					{this.state.loggedOut && <iframe src={logoutURL}/>}
				</div>
			</div>
		);
	}
}


export default Footer;
