import { IPasswordErrors } from '../types/interfaces';
import { ChangeEvent } from 'react';

const REGEXP = {
  // eslint-disable-next-line no-useless-escape
  mail: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
  zip: /^\d{5}(-\d{4})?$/,
  phone:
    /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/,
  password: /[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/,
  digitPassword: /.*\d.*/g,
  uppercasePassword: /.*[A-Z].*/g,
  lowercasePassword: /.*[a-z].*/g,
  whitespacePassword: /.*\s.*/g,
  character: /^[a-zA-Z]+$/g,
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
};

export const loginHandler = (
  e: ChangeEvent<HTMLInputElement>,
  func: React.Dispatch<React.SetStateAction<string>>
): void => {
  func((e.target as HTMLInputElement).value);
};

export const handleLoginInput = (
  loginField: string,
  setErrorLogin: React.Dispatch<React.SetStateAction<string>>,
  loginСheck: boolean
): boolean => {
  if (loginField === '') {
    console.log(loginField);
    setErrorLogin(clue.requiredField);
    loginСheck = false;
  } else if (!REGEXP.mail.test(loginField)) {
    setErrorLogin(clue.invalidEmail);
    loginСheck = false;
  } else {
    setErrorLogin('Completed');
    loginСheck = true;
  }
  return loginСheck;
};

export const passwordHandler = (
  e: ChangeEvent<HTMLInputElement>,
  func: React.Dispatch<React.SetStateAction<string>>
): void => {
  func((e.target as HTMLInputElement).value);
};

export const handlePasswordInput = (passwordField: string): IPasswordErrors => {
  //валидация для пароля
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

export const firstnameHandler = (
  e: ChangeEvent<HTMLInputElement>,
  func: React.Dispatch<React.SetStateAction<string>>
): void => {
  func((e.target as HTMLInputElement).value);
};

export const handleFirstnameInput = (
  firstnameField: string,
  setErrorFirstname: React.Dispatch<React.SetStateAction<string>>,
  firstnameСheck: boolean
): boolean => {
  if (firstnameField === '') {
    setErrorFirstname(clue.requiredField);
    firstnameСheck = false;
  } else if (!REGEXP.character.test(firstnameField)) {
    setErrorFirstname(clue.character);
    firstnameСheck = false;
  } else {
    setErrorFirstname('Completed');
    firstnameСheck = true;
  }
  return firstnameСheck;
};

export const lastnameHandler = (
  e: ChangeEvent<HTMLInputElement>,
  func: React.Dispatch<React.SetStateAction<string>>
): void => {
  func((e.target as HTMLInputElement).value);
};

export const handleLastnameInput = (
  lastnameField: string,
  setErrorLastname: React.Dispatch<React.SetStateAction<string>>,
  lastnameСheck: boolean
): boolean => {
  if (lastnameField === '') {
    setErrorLastname(clue.requiredField);
    lastnameСheck = false;
  } else if (!REGEXP.character.test(lastnameField)) {
    setErrorLastname(clue.character);
    lastnameСheck = false;
  } else {
    setErrorLastname('Completed');
    lastnameСheck = true;
  }
  return lastnameСheck;
};

export const streetShipHandler = (
  e: ChangeEvent<HTMLInputElement>,
  func: React.Dispatch<React.SetStateAction<string>>
): void => {
  func((e.target as HTMLInputElement).value);
};

export const handleStreetShipInput = (
  streetShipField: string,
  setErrorStreetShip: React.Dispatch<React.SetStateAction<string>>,
  streetShipСheck: boolean
): boolean => {
  if (streetShipField === '') {
    setErrorStreetShip(clue.requiredField);
    streetShipСheck = false;
  } else if (!REGEXP.character.test(streetShipField)) {
    setErrorStreetShip(clue.character);
    streetShipСheck = false;
  } else {
    setErrorStreetShip('Completed');
    streetShipСheck = true;
  }
  return streetShipСheck;
};

export const cityShipHandler = (
  e: ChangeEvent<HTMLInputElement>,
  func: React.Dispatch<React.SetStateAction<string>>
): void => {
  func((e.target as HTMLInputElement).value);
};

export const handleCityShipInput = (
  cityShipField: string,
  setErrorCityShip: React.Dispatch<React.SetStateAction<string>>,
  cityShipСheck: boolean
): boolean => {
  if (cityShipField === '') {
    setErrorCityShip(clue.requiredField);
    cityShipСheck = false;
  } else if (!REGEXP.character.test(cityShipField)) {
    setErrorCityShip(clue.character);
    cityShipСheck = false;
  } else {
    setErrorCityShip('Completed');
    cityShipСheck = true;
  }
  return cityShipСheck;
};

export const postalShipHandler = (
  e: ChangeEvent<HTMLInputElement>,
  func: React.Dispatch<React.SetStateAction<string>>
): void => {
  func((e.target as HTMLInputElement).value);
};

export const handlePostalShipInput = (
  postalShipField: string,
  setErrorPostalShip: React.Dispatch<React.SetStateAction<string>>,
  postalShipСheck: boolean
): boolean => {
  if (postalShipField === '') {
    setErrorPostalShip(clue.requiredField);
    postalShipСheck = false;
  } else if (!REGEXP.character.test(postalShipField)) {
    setErrorPostalShip(clue.character);
    postalShipСheck = false;
  } else {
    setErrorPostalShip('Completed');
    postalShipСheck = true;
  }
  return postalShipСheck;
};

export const countryShipHandler = (
  e: ChangeEvent<HTMLInputElement>,
  func: React.Dispatch<React.SetStateAction<string>>
): void => {
  func((e.target as HTMLInputElement).value);
};

export const handlCountryShipInput = (
  countryShipField: string,
  setErrorCountryShip: React.Dispatch<React.SetStateAction<string>>,
  countryShipСheck: boolean
): boolean => {
  if (countryShipField === '') {
    setErrorCountryShip(clue.requiredField);
    countryShipСheck = false;
  } else if (!REGEXP.character.test(countryShipField)) {
    setErrorCountryShip(clue.character);
    countryShipСheck = false;
  } else {
    setErrorCountryShip('Completed');
    countryShipСheck = true;
  }
  return countryShipСheck;
};
