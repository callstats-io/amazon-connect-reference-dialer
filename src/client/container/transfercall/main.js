import React from 'react';
import Header from './../header/index';
import Body from './body';

import styles from './transfercall.css';

const TransferCallView = ({}) => (
  <div className={`row h-100`}>
    <div className={`col-12 ${styles.zeroPadding}`}>
      <div className={`card h-100 ${styles.cardBodyMain}`}>
        <Header/>
        <Body/>
      </div>
    </div>
  </div>
);

export default TransferCallView;
