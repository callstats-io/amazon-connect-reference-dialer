import React from "react";
import PropTypes from "prop-types";

import agentMicMutedIcon from '../../res/images/muted-icon.svg';

const AgentMutedLabel = ({muted = false}) => (
	<div className={`col-md-12`}>
		<div className={`row`}>
			<div className={`col-md-2`}>
				{muted && <img src={agentMicMutedIcon}/>}
			</div>
			<div className={`col-md-6 pl-0`}>
				{muted &&
				<p style={{
					fontFamily: 'AmazonEmber',
					color: '#ffffff',
					fontSize: '14px',
					marginTop: '2%'
				}}> MUTED</p>}
			</div>
			<div className={`col-md-4 text-center`}>
				<p style={{
					fontFamily: 'AmazonEmber',
					color: '#ffffff',
					marginLeft: '30%',
					fontSize: '14px',
					marginTop: '2%'
				}}> You</p>
			</div>
		</div>
	</div>
);

AgentMutedLabel.propTypes = {
	muted: PropTypes.bool,
};

export default AgentMutedLabel;
