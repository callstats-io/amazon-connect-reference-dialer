'use strict';

import lo from 'lodash';
import CountryData from './countrydata';
import { AsYouType, isValidNumber } from 'libphonenumber-js';

export const getCountryDetails = (countryCode = '') => {
  if (!countryCode) {
    return {};
  }
  return lo.find(CountryData.allCountries, (currentCountry) => {
    return lo.get(currentCountry, 'iso2') === countryCode;
  });
};

const parseRawPhoneNumber = (dialableCountryList = [], currentPhoneNumber = '') => {
  for (const curCountry of dialableCountryList) {
    const dialCode = `+${lo.get(curCountry, 'dialCode')}`;
    if (currentPhoneNumber.startsWith(dialCode)) {
      return currentPhoneNumber.replace(dialCode, '');
    }
  }
  if (currentPhoneNumber && currentPhoneNumber.length > 30) {
    return currentPhoneNumber.substr(0, 30);
  }
  return currentPhoneNumber;
};

export const getFormattedPhoneNumber = (dialableCountryList = [], selectedCountry = {}, currentPhoneNumber = '') => {
  currentPhoneNumber = parseRawPhoneNumber(dialableCountryList, currentPhoneNumber);
  const currentDialCode = `+${lo.get(selectedCountry, 'dialCode', '')}`;
  const numberWithIsoCode = `${currentDialCode} ${currentPhoneNumber}`;
  try {
    const formatPhoneNumber = new AsYouType().input(numberWithIsoCode);
    if (formatPhoneNumber === '') {
      console.warn('invalid phone number', numberWithIsoCode);
    }
    return formatPhoneNumber;
  } catch (err) {
    return currentDialCode;
  }
};

export const isPhoneNumber = (currentNumber = '') => {
  if (!currentNumber) {
    return true;
  }
  return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/gm.test(currentNumber);
};
