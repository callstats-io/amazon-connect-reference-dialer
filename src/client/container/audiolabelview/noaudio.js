import React from 'react';
import PropTypes from 'prop-types';

import mediaManager from './../../api/mediaManager';
import sessionManager from './../../api/sessionManager';
import AudioFrequencyMonitor from './controller';

const style = {
  fill: '#ffffff',
  fillOpacity: 1,
  fillRule: 'nonzero',
  stroke: 'none'
};

class NoAudio extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const viewBox = this.props.viewBox || '0 200 1000 1000';
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}
				 x="0"
				 y="0"
				 width="100%"
				 height="100%">
        <defs id="defs6">
          <clipPath id="clipPath18">
            <path id="path16" d="M 0,1211 H 1127 V 0 H 0 Z"/>
          </clipPath>
        </defs>
        <g transform="translate(285.45 600)" id="g40">
          <path ref="bar1"
						  style={style}
						  d="m 0,0 h -11.941 c -14.938,0 -27.048,12.11 -27.048,27.048 v 10 c 0,14.938 12.11,27.048 27.048,27.048 H 0 c 14.938,0 27.048,-12.11 27.048,-27.048 V 27.048 C 27.048,12.11 14.938,0 0,0"
          />
        </g>
        <g transform="translate(400.049 600)" id="g36">
          <path ref="bar2"
						  style={style}
						  d="m 0,0 h -11.941 c -14.938,0 -27.048,12.11 -27.048,27.048 v 10 c 0,14.938 12.11,27.048 27.048,27.048 H 0 c 14.938,0 27.048,-12.11 27.048,-27.048 V 27.048 C 27.048,12.11 14.938,0 0,0"
          />
        </g>
        <g transform="translate(514.647 600)" id="g32">
          <path ref="bar3"
						  style={style}
						  d="m 0,0 h -11.941 c -14.938,0 -27.048,12.11 -27.048,27.048 v 10 c 0,14.938 12.11,27.048 27.048,27.048 H 0 c 14.938,0 27.048,-12.11 27.048,-27.048 V 27.048 C 27.048,12.11 14.938,0 0,0"
          />
        </g>
        <g transform="translate(629.245 600)" id="g28">
          <path ref="bar4"
						  style={style}
						  d="m 0,0 h -11.941 c -14.938,0 -27.048,12.11 -27.048,27.048 v 10 c 0,14.938 12.11,27.048 27.048,27.048 H 0 c 14.938,0 27.048,-12.11 27.048,-27.048 V 27.048 C 27.048,12.11 14.938,0 0,0"
          />
        </g>
        <g transform="translate(743.843 600)" id="g24">
          <path ref="bar5"
						  style={style}
						  d="m 0,0 h -11.941 c -14.938,0 -27.048,12.11 -27.048,27.048 v 10 c 0,14.938 12.11,27.048 27.048,27.048 H 0 c 14.938,0 27.048,-12.11 27.048,-27.048 V 27.048 C 27.048,12.11 14.938,0 0,0"
          />
        </g>
        <g transform="translate(858.442 600)" id="g44">
          <path ref="bar6"
						  style={style}
						  d="m 0,0 h -11.941 c -14.938,0 -27.048,12.11 -27.048,27.048 v 10 c 0,14.938 12.11,27.048 27.048,27.048 H 0 c 14.938,0 27.048,-12.11 27.048,-27.048 V 27.048 C 27.048,12.11 14.938,0 0,0"
          />
        </g>

        <g transform="translate(973.041 600)" id="g45">
          <path ref="bar7"
						  style={style}
						  d="m 0,0 h -11.941 c -14.938,0 -27.048,12.11 -27.048,27.048 v 10 c 0,14.938 12.11,27.048 27.048,27.048 H 0 c 14.938,0 27.048,-12.11 27.048,-27.048 V 27.048 C 27.048,12.11 14.938,0 0,0"
          />
        </g>
      </svg>

    );
  }
}

NoAudio.propTypes = {
  viewBox: PropTypes.string
};

export default NoAudio;
