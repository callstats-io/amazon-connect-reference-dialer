import React from "react";
import PropTypes from "prop-types";

import AudioLevel from '../audiolabelview/audiolevel';
import {getColorSchema} from './../../utils/agetStateMap';

const AgentStatusAndAudioLabel = ({agentState, stream}) => (
	<div className={'col-md-12'}>
		<div className={'row'}>
			<div className={`col-md-9`}>
				<p className={`m-0`} style={{
					fontFamily: 'AmazonEmber',
					color: '#ffffff',
					fontSize: '24px'
				}}> {agentState} </p>
			</div>
			<div className={`col-md-3 text-center`}>
				<AudioLevel backgroundColor={getColorSchema(agentState)} stream={stream}/>
			</div>
		</div>
	</div>
);


AgentStatusAndAudioLabel.propTypes = {
	agentState: PropTypes.string,
	stream: PropTypes.object
};
export default AgentStatusAndAudioLabel;
