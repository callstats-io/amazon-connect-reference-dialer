import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import intl from 'intl';

import './res/scss/global.css';

// apply polyfill
if (!window.Intl) {
  window.Intl = intl;
}

ReactDOM.render(<App/>, document.getElementById('root'));
