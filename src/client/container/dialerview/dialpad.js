import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './dialpad.css';

class DialPad extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const handleClick = this.props.numPadHandler;
    return (
      <div className={'col-md-12 ml-4'}>
        <ul className={styles.dialPadKeyboard}>
          <li className={`letter`} onClick={handleClick.bind(this, '1')}>1</li>
          <li className={`letter`} onClick={handleClick.bind(this, '2')}>2</li>
          <li className={`letter`} onClick={handleClick.bind(this, '3')} value={'3'}>3</li>
          <li className={`letter ${styles.clearl}`} onClick={handleClick.bind(this, '4')} value={'4'}>4</li>
          <li className={`letter`} onClick={handleClick.bind(this, '5')} value={'5'}>5</li>
          <li className={`letter`} onClick={handleClick.bind(this, '6')} value={'6'}>6</li>

          <li className={`letter ${styles.clearl}`} onClick={handleClick.bind(this, '7')} value={'7'}>7</li>
          <li className={`letter`} onClick={handleClick.bind(this, '8')} value={'8'}>8</li>
          <li className={`letter`} onClick={handleClick.bind(this, '9')} value={'9'}>9</li>
          <li className={`letter ${styles.clearl}`} onClick={handleClick.bind(this, '*')} value={'*'}>*</li>
          <li className={`letter`} onClick={handleClick.bind(this, '0')} value={'0'}>0</li>
          <li className={`letter`} onClick={handleClick.bind(this, '#')} value={'#'}>#</li>
        </ul>
      </div>
    );
  }
}

DialPad.propTypes = {
  numPadHandler: PropTypes.func.isRequired
};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialPad);
