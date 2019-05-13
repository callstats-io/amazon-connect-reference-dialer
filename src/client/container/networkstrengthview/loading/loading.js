import React from 'react';
import styles from './loading.css';

const Loading = ({}) => (
  <span className={styles.showbox}>
    <div className={styles.loader}>
      <svg className={styles.circular} viewBox="25 25 50 50">
        <circle className={styles.path} cx="50" cy="50" r="20" fill="none" strokeWidth="5"
          strokeMiterlimit="10"/>
      </svg>
    </div>
  </span>
);

export default Loading;
