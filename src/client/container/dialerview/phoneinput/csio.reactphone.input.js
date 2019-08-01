'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './phoneinput.css';
import lo from 'lodash';
import {
  getFormattedPhoneNumber
} from './utils';

class ReactPhoneInput extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showDropDown: false
    };
    this.onCountrySelection = this.onCountrySelection.bind(this);
    this.onCountrySelected = this.onCountrySelected.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onCountrySelection () {
    const { showDropDown } = this.state;
    this.setState({
      showDropDown: !showDropDown
    });
  }

  onInputChange (e) {
    this.setState({
      showDropDown: false
    });
    this.props.onPhoneNumberChange(e);
  }

  onCountrySelected (selectedCountry) {
    this.onCountrySelection();
    this.props.onCountrySelected(selectedCountry);
  }

  render () {
    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <div
            onClick={this.onCountrySelection}
            className={`input-group-text ${styles.flag_group} ${styles.cursor}`}>
            <div className={`${styles.selection_flag} ${styles[lo.get(this.props.selectedCountry, 'iso2')]}`}/>
          </div>
          <div className={`dropdown-menu ${this.state.showDropDown && 'show'} ${styles.scrollable} ${styles.dropdown_menu}`} aria-labelledby="dropdownMenuLink">
            {this.props.dialableCountryList.map(currentCountry => (
              <div key={lo.get(currentCountry, 'iso2')}
                className={`dropdown-item row ${styles.cursor} ${styles.dropdown_item}`}
                onClick={() => this.onCountrySelected(currentCountry)}>

                <div className={'row'}>
                  <div className={`col-md-2 mt-2`}>
                    <div className={`${styles.flag} ${styles[lo.get(currentCountry, 'iso2', '')]}`}></div>
                  </div>
                  <div className={`col-md-6 pl-0`}>
                    <div className={`${styles.country_text}`}> {lo.get(currentCountry, 'name', '')} </div>
                  </div>
                  <div className={`col-md-4`}>
                    <div className={`${styles.country_code}`}> { `+ ${lo.get(currentCountry, 'dialCode', '')}` } </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
        <input type="text"
          className={`form-control ${styles.input_padding} ${styles.phone_number_input_box}`}
          aria-label="Phone number"
          onChange={this.onInputChange}
          value={ getFormattedPhoneNumber(this.props.dialableCountryList, this.props.selectedCountry, this.props.phoneNumber) }/>
      </div>
    );
  }
}

ReactPhoneInput.propTypes = {
  selectedCountry: PropTypes.object,
  phoneNumber: PropTypes.string,
  dialableCountryList: PropTypes.array,
  onCountrySelected: PropTypes.func.isRequired,
  onPhoneNumberChange: PropTypes.func.isRequired
};

export default ReactPhoneInput;
