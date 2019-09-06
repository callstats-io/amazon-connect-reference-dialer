import React from 'react';
import Header from './../header/index';
import Body from './body';

import styles from './quickconnects.css';

const QuickConnectsView = ({}) => (
  <div className={`row h-100`}>
    <div className={`col-12 ${styles.zeroPadding}`}>
      <div className={`card h-100 ${styles.cardBodyMain}`}>
        <Header/>
        <Body/>
      </div>
    </div>
  </div>
);

export default QuickConnectsView;
