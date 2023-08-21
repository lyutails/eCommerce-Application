import { IPasswordErrors } from '../types/interfaces';
import { ChangeEvent } from 'react';

const REGEXP = {
  /* eslint-disable-next-line no-useless-escape */
  mail: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
  postalUSA: /^\d{5}(?:-\d{4})?$/,
  postalCanada: /^[a-zA-Z][0-9][a-zA-Z](\s?[0-9][a-zA-Z][0-9])?$/,
  postalBillUSA: /^\d{5}(?:-\d{4})?$/,
  postalBillCanada: /^[a-zA-Z][0-9][a-zA-Z](\s?[0-9][a-zA-Z][0-9])?$/,
  phone:
    /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/,
  password: /[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/,
  digitPassword: /.*\d.*/g,
  uppercasePassword: /.*[A-Z].*/g,
  lowercasePassword: /.*[a-z].*/g,
  whitespacePassword: /.*\s.*/g,
  fistname: /^[a-zA-Z]+$/g,
  lastname: /^[a-zA-Z]+$/g,
  street: /^[0-9\sA-Za-z]+$/,
  city: /^[A-Za-z\s]+$/g,
  building: /^(?=.*\d)[a-zA-Z0-9]*(?:\/[a-zA-Z0-9]*)?$/,
  apartment: /.*\d.*/g,
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
  postalUsa: 'Must follow the format for the USA 12345',
  postalCanada: 'Must follow the format for Canada A1B 2C3',
  countryShip: 'Please select the USA or Canada shipping country',
  countryBill: 'Please select the USA or Canada billing country',
  building: 'Building number should be in format: 333, 333a, 333/1, 333/a',
  apartment: 'Apartment number must contain only digit',
};

export const inputHandler = (
  e: ChangeEvent<HTMLInputElement>,
  func: React.Dispatch<React.SetStateAction<string>>
): void => {
  func((e.target as HTMLInputElement).value.trim());
};

export const selectHandler = (
  e: React.ChangeEvent<HTMLSelectElement>,
  func: React.Dispatch<React.SetStateAction<string>>
): void => {
  func((e.target as HTMLSelectElement).value.trim());
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
    setErrorLogin('');
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
    setErrorFirstname('');
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
    setErrorLastname('');
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
    setErrorStreetShip('');
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
    setErrorCityShip('');
    setCheckmark(true);
    cityShipСheck = true;
  }
  return cityShipСheck;
};

export const handlePostalShipInput = (
  postalShipField: string,
  setErrorPostalShip: React.Dispatch<React.SetStateAction<string>>,
  postalShipСheck: boolean,
  setCheckmark: React.Dispatch<React.SetStateAction<boolean>>,
  countryShipField: string
): boolean => {
  REGEXP.postalUSA.lastIndex = 0;
  REGEXP.postalCanada.lastIndex = 0;
  if (postalShipField === '') {
    setErrorPostalShip(clue.requiredField);
    postalShipСheck = false;
    setCheckmark(false);
  } else if (
    countryShipField === 'usa' &&
    !REGEXP.postalUSA.test(postalShipField)
  ) {
    setErrorPostalShip(clue.postalUsa);
    postalShipСheck = false;
    setCheckmark(false);
  } else if (
    countryShipField === 'canada' &&
    !REGEXP.postalBillCanada.test(postalShipField)
  ) {
    setErrorPostalShip(clue.postalCanada);
    postalShipСheck = false;
    setCheckmark(false);
  } else {
    setErrorPostalShip('');
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
  } else {
    setErrorCountryShip('');
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
    setErrorBirthday('');
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
    setErrorStreetBill('');
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
    setErrorCityBill('');
    setCheckmark(true);
    cityBillСheck = true;
  }
  return cityBillСheck;
};

export const handlePostalBillInput = (
  postalBillField: string,
  setErrorPostalBill: React.Dispatch<React.SetStateAction<string>>,
  postalBillСheck: boolean,
  setCheckmark: React.Dispatch<React.SetStateAction<boolean>>,
  countryBillField: string
): boolean => {
  REGEXP.postalBillUSA.lastIndex = 0;
  REGEXP.postalBillCanada.lastIndex = 0;
  if (postalBillField === '') {
    setErrorPostalBill(clue.requiredField);
    postalBillСheck = false;
    setCheckmark(false);
  } else if (
    countryBillField === 'usa' &&
    !REGEXP.postalUSA.test(postalBillField)
  ) {
    setErrorPostalBill(clue.postalUsa);
    postalBillСheck = false;
    setCheckmark(false);
  } else if (
    countryBillField === 'canada' &&
    !REGEXP.postalBillCanada.test(postalBillField)
  ) {
    setErrorPostalBill(clue.postalCanada);
    postalBillСheck = false;
    setCheckmark(false);
  } else {
    setErrorPostalBill('');
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
  } else {
    setErrorCountryBill('');
    setCheckmark(true);
    countryBillСheck = true;
  }
  return countryBillСheck;
};

export const handleBuildingBillInput = (
  buildingBillField: string,
  setErrorbuildingBill: React.Dispatch<React.SetStateAction<string>>,
  buildingBillСheck: boolean,
  setCheckmark: React.Dispatch<React.SetStateAction<boolean>>
): boolean => {
  REGEXP.building.lastIndex = 0;
  if (buildingBillField === '') {
    setErrorbuildingBill(clue.requiredField);
    buildingBillСheck = false;
    setCheckmark(false);
  } else if (!REGEXP.building.test(buildingBillField)) {
    setErrorbuildingBill(clue.building);
    buildingBillСheck = false;
    setCheckmark(false);
  } else {
    setErrorbuildingBill('');
    setCheckmark(true);
    buildingBillСheck = true;
  }
  return buildingBillСheck;
};

export const handleApartmentBillInput = (
  apartmentBillField: string,
  setErrorApartmentBill: React.Dispatch<React.SetStateAction<string>>,
  apartmentBillСheck: boolean,
  setCheckmark: React.Dispatch<React.SetStateAction<boolean>>
): boolean => {
  REGEXP.apartment.lastIndex = 0;
  if (apartmentBillField === '') {
    setErrorApartmentBill('');
    setCheckmark(true);
    apartmentBillСheck = true;
  } else if (!REGEXP.apartment.test(apartmentBillField)) {
    setErrorApartmentBill(clue.apartment);
    apartmentBillСheck = false;
    setCheckmark(false);
  } else {
    setErrorApartmentBill('');
    setCheckmark(true);
    apartmentBillСheck = true;
  }
  return apartmentBillСheck;
};

export const handleBuildingShipInput = (
  buildingShipField: string,
  setErrorbuildingShip: React.Dispatch<React.SetStateAction<string>>,
  buildingShipСheck: boolean,
  setCheckmark: React.Dispatch<React.SetStateAction<boolean>>
): boolean => {
  REGEXP.building.lastIndex = 0;
  if (buildingShipField === '') {
    setErrorbuildingShip(clue.requiredField);
    buildingShipСheck = false;
    setCheckmark(false);
  } else if (!REGEXP.building.test(buildingShipField)) {
    setErrorbuildingShip(clue.building);
    buildingShipСheck = false;
    setCheckmark(false);
  } else {
    setErrorbuildingShip('');
    setCheckmark(true);
    buildingShipСheck = true;
  }
  return buildingShipСheck;
};

export const handleApartmentShipInput = (
  apartmentShipField: string,
  setErrorApartmentShip: React.Dispatch<React.SetStateAction<string>>,
  apartmentShipСheck: boolean,
  setCheckmark: React.Dispatch<React.SetStateAction<boolean>>
): boolean => {
  REGEXP.apartment.lastIndex = 0;
  if (apartmentShipField === '') {
    setErrorApartmentShip('');
    setCheckmark(true);
    apartmentShipСheck = true;
  } else if (!REGEXP.apartment.test(apartmentShipField)) {
    setErrorApartmentShip(clue.apartment);
    apartmentShipСheck = false;
    setCheckmark(false);
  } else {
    setErrorApartmentShip('');
    setCheckmark(true);
    apartmentShipСheck = true;
  }
  return apartmentShipСheck;
};
