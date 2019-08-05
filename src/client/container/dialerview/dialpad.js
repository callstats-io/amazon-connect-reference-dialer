import React from 'react';
import PropTypes from 'prop-types';

import styles from './dialpad.css';

const DialPad = ({ numPadHandler: handleClick }) => (
  <div className={'col-12 ml-4'}>
    <ul className={styles.dialPadKeyboard}>
      <li className={`letter`} onClick={() => handleClick('1')}>1</li>
      <li className={`letter`} onClick={() => handleClick('2')}>2</li>
      <li className={`letter`} onClick={() => handleClick('3')} value={'3'}>3</li>
      <li className={`letter ${styles.clearl}`} onClick={() => handleClick('4')} value={'4'}>4</li>
      <li className={`letter`} onClick={() => handleClick('5')} value={'5'}>5</li>
      <li className={`letter`} onClick={() => handleClick('6')} value={'6'}>6</li>

      <li className={`letter ${styles.clearl}`} onClick={() => handleClick('7')} value={'7'}>7</li>
      <li className={`letter`} onClick={() => handleClick('8')} value={'8'}>8</li>
      <li className={`letter`} onClick={() => handleClick('9')} value={'9'}>9</li>
      <li className={`letter ${styles.clearl}`} onClick={() => handleClick('*')} value={'*'}>*</li>
      <li className={`letter`} onClick={() => handleClick('0')} value={'0'}>0</li>
      <li className={`letter`} onClick={() => handleClick('#')} value={'#'}>#</li>
    </ul>
  </div>
);
DialPad.propTypes = {
  numPadHandler: PropTypes.func.isRequired
};

export default DialPad;
