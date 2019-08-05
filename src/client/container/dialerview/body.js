import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPhoneInput from 'react-phone-input-2';
import lo from 'lodash';
import closeOrDismissIcon from '../../res/images/fa-close-or-dismiss.svg';

import {
  onRequestShowDialPad
} from '../../reducers/acReducer';

import styles from './dialpad.css';

import sessionManager from './../../api/sessionManager';
import DialPad from './dialpad';
import databaseManager from '../../api/databaseManager';

class Body extends Component {
  constructor (props) {
    super(props);
    this.state = {
      phoneNumber: '',
      defaultCountry: databaseManager.getDefaultCountry() || lo.first(sessionManager.getDialableCountries(), 'fi'),
      errorCount: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.numPadHandler = this.numPadHandler.bind(this);
    this.inputValue = React.createRef();
  }

  closeDialPad () {
    this.props.closeDialPad();
  }

  handleInputChange (value, countryData) {
    if (this.state.defaultCountry !== lo.get(countryData, 'countryCode')) {
      databaseManager.setDefaultCountry(lo.get(countryData, 'countryCode'));
    }
    this.setState({
      phoneNumber: value
    });
    if (sessionManager.isActive()) {
      sessionManager.sendDigit(lo.last(value)).then(success => {
      }).catch(err => console.warn(err));
    }
  }

  numPadHandler (value) {
    if (!value) {
      return;
    }
    const { phoneNumber } = this.state;
    this.setState({
      phoneNumber: `${phoneNumber}${value}`
    });
    if (sessionManager.isActive()) {
      sessionManager.sendDigit(value).then(success => {
      }).catch(err => console.warn(err));
    }
  }

  dialNumber () {
    const { formattedNumber: phoneNumber } = this.inputValue.current.state;
    sessionManager.dialNumber(phoneNumber).then(success => {
      this.closeDialPad();
    }, err => {
      console.error(err);
    });
  }

  // eslint-disable-next-line handle-callback-err
  componentDidCatch (error, info) {
    this.setState({
      errorCount: this.state.errorCount + 1
    });
  }

  render () {
    const dialableCountries = sessionManager.getDialableCountries();
    return (
      <div className="card-body" style={{ backgroundColor: '#ffffff' }}>
        <div className="row">
          <div className="col-10">
            <span className={styles.dialNumber}>Dial number</span>
          </div>
          <div className="col-2"
            onClick={() => this.closeDialPad()}>
            <img src={closeOrDismissIcon} className={styles.cursor}/>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-9">
            <ReactPhoneInput
              ref={this.inputValue}
              inputStyle={{ minWidth: '15.5em', maxWidth: '15.5em', boxShadow: 'none', borderRadius: '0' }}
              onlyCountries={dialableCountries}
              defaultCountry={this.state.defaultCountry}
              enableSearchField={true}
              value={this.state.phoneNumber}
              inputExtraProps={{
                name: 'phone',
                required: true,
                autoFocus: true
              }}
              onChange={ this.handleInputChange }/>
          </div>
          <div className="col-3 p-0 m-0">
            <a className={`btn ${styles.dialButton}`}
              onClick={() => this.dialNumber()}>
                            Dial
            </a>
          </div>
        </div>
        <div className="row mt-4">
          <DialPad numPadHandler={this.numPadHandler}/>
        </div>
      </div>
    );
  }
}

Body.propTypes = {
  closeDialPad: PropTypes.func.isRequired
};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  closeDialPad: () => {
    dispatch(onRequestShowDialPad('close'));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Body);
