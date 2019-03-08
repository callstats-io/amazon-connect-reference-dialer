import adapter from 'webrtc-adapter';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import intl from "intl";

// apply polyfill
if (!window.Intl) {
	window.Intl = intl;
}

ReactDOM.render(<App/>, document.getElementById('root'));
