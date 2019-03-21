import React, {Component} from "react";
import sessionManager from './../../api/sessionManager';
import PropTypes from "prop-types";

const DURATION_MS = 1 * 1000;

const durationCSS = {
	div: 'col-md-4 align-self-center text-right',
	p: 'm-0',
	pStyle: {
		fontFamily: 'AmazonEmber',
		color: '#ffffff',
		fontSize: '14px'
	},
};

// Will show the duration of current agent state duration
class Duration extends Component {
	constructor(props) {
		super(props);
		this.intervalId = undefined;
		this.state = {
			duration: '00:00:00',
		}
	}

	_dispose() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
	}

	componentDidMount() {
		this._dispose();
		this.intervalId = setInterval(() => {
			let duration = sessionManager.getPrimaryConnectionDuration();
			this.setState({
				duration: duration,
			});
		}, DURATION_MS);
	}

	componentWillUnmount() {
		this._dispose();
	}

	render() {
		return (
			<div className={durationCSS.div}>
				<p className={durationCSS.p}
				   style={durationCSS.pStyle}>{this.state.duration}</p>
			</div>
		);
	}
}

Duration.propTypes = {
	currentState: PropTypes.string,
};

export default Duration;
