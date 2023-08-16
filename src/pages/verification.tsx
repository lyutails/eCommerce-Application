import { IPasswordErrors } from '../types/interfaces';
import { ChangeEvent } from 'react';

const REGEXP = {
  // eslint-disable-next-line no-useless-escape
  mail: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
  postalUSA: /^\d{5}(?:-\d{4})?$/,
  postalCanada: /^[A-Za-z]\d[A-Za-z]( \d[A-Za-z]\d)?$/,
  phone:
    /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/,
  password: /[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/,
  digitPassword: /.*\d.*/g,
  uppercasePassword: /.*[A-Z].*/g,
  lowercasePassword: /.*[a-z].*/g,
  whitespacePassword: /.*\s.*/g,
  fistname: /^[a-zA-Z]+$/g,
  lastname: /^[a-zA-Z]+$/g,
  street: /^[a-zA-Z]+$/g,
  city: /^[a-zA-Z]+$/g,
};

export const clue = {
  invalidEmail:
    'Please enter a valid email address (for example: name@example.com)',
  invalidPassword: 'Please enter a valid password',
  shortPassword: 'Password must be at least 8 characters long',
  uppercasePassword:
    'Password must contain at least one uppercase letter (A-Z)',
  lowercasePassword:
    'Password must contain at least one lowercase letter (a-z)',
  digitPassword: 'Password must contain at least one digit (0-9)',
  specialPassword:
    'Password must contain at least one special character (e.g., !@#$%^&*)',
  invalidTypePassword:
    'Password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  requiredField: 'This is required field',
  character:
    'Must contain at least one character and no special characters or numbers',
  postal:
    'Must follow the format for the country (e.g., 12345 or A1B 2C3 for the U.S. and Canada, respectively)',
  country: 'Please, choose USA or Canada',
};

export const inputHandler = (
  e: ChangeEvent<HTMLInputElement>,
  func: React.Dispatch<React.SetStateAction<string>>
): void => {
  func((e.target as HTMLInputElement).value);
};

export const handleLoginInput = (
  loginField: string,
  setErrorLogin: React.Dispatch<React.SetStateAction<string>>,
  loginСheck: boolean,
  setCheckmark: React.Dispatch<React.SetStateAction<boolean>>
): boolean => {
  REGEXP.mail.lastIndex = 0;
  if (loginField === '') {
    setErrorLogin(clue.requiredField);
    loginСheck = false;
    setCheckmark(false);
  } else if (!REGEXP.mail.test(loginField)) {
    setErrorLogin(clue.invalidEmail);
    loginСheck = false;
    setCheckmark(false);
  } else {
    setCheckmark(true);
    loginСheck = true;
  }
  return loginСheck;
};

export const handlePasswordInput = (passwordField: string): IPasswordErrors => {
  REGEXP.uppercasePassword.lastIndex = 0;
  REGEXP.lowercasePassword.lastIndex = 0;
  REGEXP.digitPassword.lastIndex = 0;
  REGEXP.whitespacePassword.lastIndex = 0;
  function isEmpty(): boolean {
    return passwordField === '';
  }
  function hasUppercase(): boolean {
    return !REGEXP.uppercasePassword.test(passwordField);
  }
  function hasLowercase(): boolean {
    return !REGEXP.lowercasePassword.test(passwordField);
  }
  function hasDigit(): boolean {
    return !REGEXP.digitPassword.test(passwordField);
  }
  function isShort(): boolean {
    return passwordField.length < 8;
  }
  function hasWhitespace(): boolean {
    return REGEXP.whitespacePassword.test(passwordField);
  }
  const passwordErr: IPasswordErrors = {
    empty: {
      text: 'This is required field',
      isError: isEmpty(),
    },
    uppercase: {
      text: 'Password must contain at least one uppercase letter (A-Z)',
      isError: hasUppercase(),
    },
    lowercase: {
      text: 'Password must contain at least one lowercase letter (a-z)',
      isError: hasLowercase(),
    },
    short: {
      text: 'Password must be at least 8 characters long',
      isError: isShort(),
    },
    whitespace: {
      text: 'Password must not contain leading or trailing whitespace',
      isError: hasWhitespace(),
    },
    digit: {
      text: 'Password must contain at least one digit (0-9)',
      isError: hasDigit(),
    },
  };
  return passwordErr;
};

export const handleFirstnameInput = (
  firstnameField: string,
  setErrorFirstname: React.Dispatch<React.SetStateAction<string>>,
  firstnameСheck: boolean,
  setCheckmark: React.Dispatch<React.SetStateAction<boolean>>
): boolean => {
  REGEXP.fistname.lastIndex = 0;
  if (firstnameField === '') {
    setErrorFirstname(clue.requiredField);
    firstnameСheck = false;
    setCheckmark(false);
  } else if (!REGEXP.fistname.test(firstnameField)) {
    setErrorFirstname(clue.character);
    firstnameСheck = false;
    setCheckmark(false);
  } else {
    setCheckmark(true);
    firstnameСheck = true;
  }
  return firstnameСheck;
};

export const handleLastnameInput = (
  lastnameField: string,
  setErrorLastname: React.Dispatch<React.SetStateAction<string>>,
  lastnameСheck: boolean,
  setCheckmark: React.Dispatch<React.SetStateAction<boolean>>
): boolean => {
  REGEXP.lastname.lastIndex = 0;
  if (lastnameField === '') {
    setErrorLastname(clue.requiredField);
    lastnameСheck = false;
    setCheckmark(false);
  } else if (!REGEXP.lastname.test(lastnameField)) {
    setErrorLastname(clue.character);
    lastnameСheck = false;
    setCheckmark(false);
  } else {
    setCheckmark(true);
    lastnameСheck = true;
  }
  return lastnameСheck;
};

export const handleStreetShipInput = (
  streetShipField: string,
  setErrorStreetShip: React.Dispatch<React.SetStateAction<string>>,
  streetShipСheck: boolean,
  setCheckmark: React.Dispatch<React.SetStateAction<boolean>>
): boolean => {
  REGEXP.street.lastIndex = 0;
  if (streetShipField === '') {
    setErrorStreetShip(clue.requiredField);
    streetShipСheck = false;
    setCheckmark(false);
  } else if (!REGEXP.street.test(streetShipField)) {
    setErrorStreetShip(clue.character);
    streetShipСheck = false;
    setCheckmark(false);
  } else {
    setCheckmark(true);
    streetShipСheck = true;
  }
  return streetShipСheck;
};

export const handleCityShipInput = (
  cityShipField: string,
  setErrorCityShip: React.Dispatch<React.SetStateAction<string>>,
  cityShipСheck: boolean,
  setCheckmark: React.Dispatch<React.SetStateAction<boolean>>
): boolean => {
  REGEXP.city.lastIndex = 0;
  if (cityShipField === '') {
    setErrorCityShip(clue.requiredField);
    cityShipСheck = false;
    setCheckmark(false);
  } else if (!REGEXP.city.test(cityShipField)) {
    setErrorCityShip(clue.character);
    cityShipСheck = false;
    setCheckmark(false);
  } else {
    setCheckmark(true);
    cityShipСheck = true;
  }
  return cityShipСheck;
};

export const handlePostalShipInput = (
  postalShipField: string,
  setErrorPostalShip: React.Dispatch<React.SetStateAction<string>>,
  postalShipСheck: boolean,
  setCheckmark: React.Dispatch<React.SetStateAction<boolean>>
): boolean => {
  REGEXP.postalUSA.lastIndex = 0;
  REGEXP.postalCanada.lastIndex = 0;
  if (postalShipField === '') {
    setErrorPostalShip(clue.requiredField);
    postalShipСheck = false;
    setCheckmark(false);
  } else if (
    !REGEXP.postalUSA.test(postalShipField) &&
    !REGEXP.postalCanada.test(postalShipField)
  ) {
    setErrorPostalShip(clue.character);
    postalShipСheck = false;
    setCheckmark(false);
  } else {
    setCheckmark(true);
    postalShipСheck = true;
  }
  return postalShipСheck;
};

export const handleCountryShipInput = (
  countryShipField: string,
  setErrorCountryShip: React.Dispatch<React.SetStateAction<string>>,
  countryShipСheck: boolean,
  setCheckmark: React.Dispatch<React.SetStateAction<boolean>>
): boolean => {
  if (countryShipField === '') {
    setErrorCountryShip(clue.requiredField);
    countryShipСheck = false;
    setCheckmark(false);
  } else if (
    countryShipField.toLowerCase() !== 'canada' &&
    countryShipField.toLowerCase() !== 'usa'
  ) {
    setErrorCountryShip(clue.country);
    countryShipСheck = false;
    setCheckmark(false);
  } else {
    setCheckmark(true);
    countryShipСheck = true;
  }
  return countryShipСheck;
};

export const handleBirthdayInput = (
  birthdayField: string,
  setErrorBirthday: React.Dispatch<React.SetStateAction<string>>,
  birthdayСheck: boolean,
  setCheckmark: React.Dispatch<React.SetStateAction<boolean>>
): boolean => {
  if (birthdayField === '') {
    setErrorBirthday(clue.requiredField);
    birthdayСheck = false;
    setCheckmark(false);
  } else {
    setCheckmark(true);
    birthdayСheck = true;
  }
  return birthdayСheck;
};

export const handleStreetBillInput = (
  streetBillField: string,
  setErrorStreetBill: React.Dispatch<React.SetStateAction<string>>,
  streetBillСheck: boolean,
  setCheckmark: React.Dispatch<React.SetStateAction<boolean>>
): boolean => {
  REGEXP.street.lastIndex = 0;
  if (streetBillField === '') {
    setErrorStreetBill(clue.requiredField);
    streetBillСheck = false;
    setCheckmark(false);
  } else if (!REGEXP.street.test(streetBillField)) {
    setErrorStreetBill(clue.character);
    streetBillСheck = false;
    setCheckmark(false);
  } else {
    setCheckmark(true);
    streetBillСheck = true;
  }
  return streetBillСheck;
};

export const handleCityBillInput = (
  cityBillField: string,
  setErrorCityBill: React.Dispatch<React.SetStateAction<string>>,
  cityBillСheck: boolean,
  setCheckmark: React.Dispatch<React.SetStateAction<boolean>>
): boolean => {
  REGEXP.city.lastIndex = 0;
  if (cityBillField === '') {
    setErrorCityBill(clue.requiredField);
    cityBillСheck = false;
    setCheckmark(false);
  } else if (!REGEXP.city.test(cityBillField)) {
    setErrorCityBill(clue.character);
    cityBillСheck = false;
    setCheckmark(false);
  } else {
    setCheckmark(true);
    cityBillСheck = true;
  }
  return cityBillСheck;
};

export const handlePostalBillInput = (
  postalBillField: string,
  setErrorPostalBill: React.Dispatch<React.SetStateAction<string>>,
  postalBillСheck: boolean,
  setCheckmark: React.Dispatch<React.SetStateAction<boolean>>
): boolean => {
  REGEXP.postalUSA.lastIndex = 0;
  REGEXP.postalCanada.lastIndex = 0;
  if (postalBillField === '') {
    setErrorPostalBill(clue.requiredField);
    postalBillСheck = false;
    setCheckmark(false);
  } else if (
    !REGEXP.postalUSA.test(postalBillField) ||
    !REGEXP.postalCanada.test(postalBillField)
  ) {
    setErrorPostalBill(clue.character);
    postalBillСheck = false;
    setCheckmark(false);
  } else {
    setCheckmark(true);
    postalBillСheck = true;
  }
  return postalBillСheck;
};

export const handleCountryBillInput = (
  countryBillField: string,
  setErrorCountryBill: React.Dispatch<React.SetStateAction<string>>,
  countryBillСheck: boolean,
  setCheckmark: React.Dispatch<React.SetStateAction<boolean>>
): boolean => {
  if (countryBillField === '') {
    setErrorCountryBill(clue.requiredField);
    countryBillСheck = false;
    setCheckmark(false);
  } else if (
    countryBillField.toLowerCase() !== 'canada' &&
    countryBillField.toLowerCase() !== 'usa'
  ) {
    setErrorCountryBill(clue.country);
    countryBillСheck = false;
    setCheckmark(false);
  } else {
    setCheckmark(true);
    countryBillСheck = true;
  }
  return countryBillСheck;
};
