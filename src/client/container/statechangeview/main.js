import React from 'react';

import Header from './../header/index';
import Body from './body';
import Footer from './footer';

import styles from './statuschange.css';

const StateChangeView = ({}) => (
  <div className={`row h-100 border-right border-top border-bottom`}>
    <div className={`${styles.acZeroPadding} col-12`}>
      <div className={`${styles.acCard} card h-100`}>
        <Header/>
        <Body/>
        <Footer/>
      </div>
    </div>
  </div>
);

export default StateChangeView;
