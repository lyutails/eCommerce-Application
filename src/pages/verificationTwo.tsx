import { IPasswordErrors } from '../types/interfaces';

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

function isEmpty(passwordField: string): boolean {
  return passwordField === '';
}
function hasUppercase(passwordField: string): boolean {
  REGEXP.uppercasePassword.lastIndex = 0;
  return !REGEXP.uppercasePassword.test(passwordField);
}
function hasLowercase(passwordField: string): boolean {
  REGEXP.lowercasePassword.lastIndex = 0;
  return !REGEXP.lowercasePassword.test(passwordField);
}
function hasDigit(passwordField: string): boolean {
  REGEXP.digitPassword.lastIndex = 0;
  return !REGEXP.digitPassword.test(passwordField);
}
function isShort(passwordField: string): boolean {
  return passwordField.length < 8;
}
function hasWhitespace(passwordField: string): boolean {
  REGEXP.whitespacePassword.lastIndex = 0;
  return REGEXP.whitespacePassword.test(passwordField);
}

//hjgkhjvlhgvl
export const handlePasswordInputTwo = (
  passwordField: string
): IPasswordErrors => {
  const passwordErr: IPasswordErrors = {
    empty: {
      text: 'This is required field',
      isError: isEmpty(passwordField),
    },
    uppercase: {
      text: 'Password must contain at least one uppercase letter (A-Z)',
      isError: hasUppercase(passwordField),
    },
    lowercase: {
      text: 'Password must contain at least one lowercase letter (a-z)',
      isError: hasLowercase(passwordField),
    },
    short: {
      text: 'Password must be at least 8 characters long',
      isError: isShort(passwordField),
    },
    whitespace: {
      text: 'Password must not contain leading or trailing whitespace',
      isError: hasWhitespace(passwordField),
    },
    digit: {
      text: 'Password must contain at least one digit (0-9)',
      isError: hasDigit(passwordField),
    },
  };
  return passwordErr;
};

export function checkPasswordError(passwordField: string): boolean {
  let isError = false;
  const passwordErrors = handlePasswordInputTwo(passwordField);
  const error = Object.keys(passwordErrors).map((key): boolean => {
    if (passwordErrors[key].isError === true) {
      return true;
    }
    return false;
  });
  if (error.includes(true)) {
    isError = true;
  } else {
    isError = false;
  }
  return isError;
}
