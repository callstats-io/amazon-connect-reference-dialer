import React from 'react';
import PropTypes from 'prop-types';

import ReactPhoneInput from 'react-phone-input-2';
import styles from './../settings.css';

const DeskPhoneSettings = ({ enabled, handleInputChange, changeToDeskphone, dialableCountries = [], phoneNumber = '' }) => (
  <div className={'row mt-1'}>
    <div className={'col-9'}>
      <ReactPhoneInput inputStyle={{ minWidth: '15.5em', maxWidth: '15.5em', boxShadow: 'none', borderRadius: '0' }}
							 onlyCountries={dialableCountries}
							 defaultCountry={'fi'}
							 enableSearchField={true}
							 value={phoneNumber}
							 inputExtraProps={{
								 name: 'phone',
								 required: true,
								 autoFocus: true
							 }}
							 onChange={handleInputChange}/>
    </div>
    <div className="col-3 p-0 m-0">
      <a className={`btn ${styles.deskphoneSave}`}
			   onClick={changeToDeskphone}>
				Save
      </a>
    </div>
  </div>
);

DeskPhoneSettings.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  changeToDeskphone: PropTypes.func.isRequired,
  dialableCountries: PropTypes.array.isRequired,
  phoneNumber: PropTypes.string.isRequired
};

export default DeskPhoneSettings;
