import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPhoneInput from './phoneinput/csio.reactphone.input';
import lo from 'lodash';
import closeOrDismissIcon from '../../res/images/fa-close-or-dismiss.svg';

import {
  onRequestShowDialPad
} from '../../reducers/acReducer';

import styles from './dialpad.css';

import sessionManager from './../../api/sessionManager';
import DialPad from './dialpad';
import {
  getCountryDetails, getFormattedPhoneNumber, isPhoneNumber
} from './phoneinput/utils';
import databaseManager from '../../api/databaseManager';

class Body extends Component {
  constructor (props) {
    super(props);
    this.state = {
      phoneNumber: '',
      phoneNumber2: '',
      selectedCountry: getCountryDetails(databaseManager.getDefaultCountry()),
      dialableCountries: sessionManager.getDialableCountries().map(currentCountry => getCountryDetails(currentCountry))
    };
    this.numPadHandler = this.numPadHandler.bind(this);
    this.onCountrySelected = this.onCountrySelected.bind(this);
    this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this);
  }

  closeDialPad () {
    this.props.closeDialPad();
  }

  numPadHandler (value) {
    if (!value) {
      return;
    }
    if (sessionManager.isActive()) {
      sessionManager.sendDigit(value).then(success => {
      }).catch(err => console.warn(err));
    }
    let { phoneNumber2: number } = this.state;
    const phoneNumber = `${number}${value}`;
    if (!isPhoneNumber(phoneNumber)) {
      return;
    }
    this.setState({
      phoneNumber2: phoneNumber
    });
  }

  dialNumber () {
    const { phoneNumber2: phoneNumber } = this.state;
    sessionManager.dialNumber(phoneNumber).then(success => {
      this.closeDialPad();
    }, err => {
      console.error(err);
    });
  }

  onCountrySelected (selectedCountry) {
    const phoneNumber = getFormattedPhoneNumber(this.state.dialableCountries, selectedCountry, this.state.phoneNumber2);
    this.setState({
      selectedCountry: selectedCountry,
      phoneNumber2: isPhoneNumber(phoneNumber) ? phoneNumber : ''
    });
    databaseManager.setDefaultCountry(lo.get(selectedCountry, 'iso2'));
  }

  onPhoneNumberChange (currentPhoneNumber) {
    const phoneNumber = lo.get(currentPhoneNumber, 'target.value', '');
    if (sessionManager.isActive()) {
      sessionManager.sendDigit(lo.last(phoneNumber)).then(success => {
      }).catch(err => console.warn(err));
    }
    if (!isPhoneNumber(phoneNumber)) {
      return;
    }
    this.setState({
      phoneNumber2: phoneNumber
    });
  }

  render () {
    return (
      <div className="card-body" style={{ backgroundColor: '#ffffff' }}>
        <div className="row">
          <div className="col-md-10">
            <span className={styles.dialNumber}>Dial number</span>
          </div>
          <div className="col-md-2"
            onClick={() => this.closeDialPad()}>
            <img src={closeOrDismissIcon} className={styles.cursor}/>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-9 pr-0">
            <ReactPhoneInput
              phoneNumber={this.state.phoneNumber2}
              onPhoneNumberChange={this.onPhoneNumberChange}
              selectedCountry={this.state.selectedCountry}
              dialableCountryList={this.state.dialableCountries}
              onCountrySelected={this.onCountrySelected}
            />
          </div>
          <div className="col-md-3 p-0 m-0">
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
