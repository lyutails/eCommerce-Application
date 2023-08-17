/* eslint-disable prefer-const */
import { createCustomerMe } from '../../api/createCustomer';
import { NavigateFunction } from 'react-router-dom';
import {
  clue,
  handleCountryShipInput,
  handleCityShipInput,
  handleFirstnameInput,
  handleLastnameInput,
  handleLoginInput,
  handlePasswordInput,
  handlePostalShipInput,
  handleStreetShipInput,
  handleBirthdayInput,
  handleStreetBillInput,
  handleCityBillInput,
  handlePostalBillInput,
  handleCountryBillInput,
} from '../verification';
import { AnyAction, Dispatch } from 'redux';
import { createCustomerId } from '../../store/reducers/userReducer';
import { getCustomerToken } from '../../api/adminBuilder';

let loginСheck = false;
let passwordСheck = false;
let firstnameСheck = false;
let lastnameСheck = false;
let streetShipСheck = false;
let cityShipСheck = false;
let postalShipСheck = false;
let countryShipСheck = false;
let birthdayСheck = false;
let streetBillСheck = false;
let cityBillСheck = false;
let postalBillСheck = false;
let countryBillСheck = false;

export const handleСreationReg = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  setErrorLogin: React.Dispatch<React.SetStateAction<string>>,
  setErrorFirstname: React.Dispatch<React.SetStateAction<string>>,
  setErrorLastname: React.Dispatch<React.SetStateAction<string>>,
  setErrorStreetShip: React.Dispatch<React.SetStateAction<string>>,
  setErrorCityShip: React.Dispatch<React.SetStateAction<string>>,
  setErrorPostalShip: React.Dispatch<React.SetStateAction<string>>,
  setErrorCountryShip: React.Dispatch<React.SetStateAction<string>>,
  setErrorStreetBill: React.Dispatch<React.SetStateAction<string>>,
  setErrorCityBill: React.Dispatch<React.SetStateAction<string>>,
  setErrorPostalBill: React.Dispatch<React.SetStateAction<string>>,
  setErrorCountryBill: React.Dispatch<React.SetStateAction<string>>,
  setErrorBirthday: React.Dispatch<React.SetStateAction<string>>,
  loginField: string,
  passwordField: string,
  fistnameField: string,
  lastnameField: string,
  streetShipField: string,
  cityShipField: string,
  postalShipField: string,
  countryShipField: string,
  streetBillField: string,
  cityBillField: string,
  postalBillField: string,
  countryBillField: string,
  birthdayField: string,
  navigator: NavigateFunction,
  dispatch: Dispatch<AnyAction>,
  setCheckmarkLogin: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckmarkPassword: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckmarkFirstname: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckmarkLastname: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckmarkStreetShip: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckmarkCityShip: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckmarkPostalShip: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckmarkCountryShip: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckmarkStreetBill: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckmarkCityBill: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckmarkPostalBill: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckmarkCountryBill: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckmarkBirthday: React.Dispatch<React.SetStateAction<boolean>>,
  checkedBill: boolean
): void => {
  e.preventDefault();
  firstnameСheck = handleFirstnameInput(
    fistnameField,
    setErrorFirstname,
    firstnameСheck,
    setCheckmarkFirstname
  );
  lastnameСheck = handleLastnameInput(
    lastnameField,
    setErrorLastname,
    lastnameСheck,
    setCheckmarkLastname
  );
  streetShipСheck = handleStreetShipInput(
    streetShipField,
    setErrorStreetShip,
    streetShipСheck,
    setCheckmarkStreetShip
  );
  cityShipСheck = handleCityShipInput(
    cityShipField,
    setErrorCityShip,
    cityShipСheck,
    setCheckmarkCityShip
  );
  postalShipСheck = handlePostalShipInput(
    postalShipField,
    setErrorPostalShip,
    postalShipСheck,
    setCheckmarkPostalShip
  );
  countryShipСheck = handleCountryShipInput(
    countryShipField,
    setErrorCountryShip,
    countryShipСheck,
    setCheckmarkCountryShip
  );
  loginСheck = handleLoginInput(
    loginField,
    setErrorLogin,
    loginСheck,
    setCheckmarkLogin
  );
  streetBillСheck = handleStreetBillInput(
    streetBillField,
    setErrorStreetBill,
    streetBillСheck,
    setCheckmarkStreetBill
  );
  cityBillСheck = handleCityBillInput(
    cityBillField,
    setErrorCityBill,
    cityBillСheck,
    setCheckmarkCityBill
  );
  postalBillСheck = handlePostalBillInput(
    postalBillField,
    setErrorPostalBill,
    postalBillСheck,
    setCheckmarkPostalBill
  );
  countryBillСheck = handleCountryBillInput(
    countryBillField,
    setErrorCountryBill,
    countryBillСheck,
    setCheckmarkCountryBill
  );
  const passwordErr = handlePasswordInput(passwordField);
  Object.keys(passwordErr).every((key): void => {
    if (passwordErr[key].isError === true) {
      passwordСheck = false;
    } else {
      setCheckmarkPassword(true);
      passwordСheck = true;
    }
  });
  // console.log(postalBillField);
  birthdayСheck = handleBirthdayInput(
    birthdayField,
    setErrorBirthday,
    birthdayСheck,
    setCheckmarkBirthday
  );
  let parts = birthdayField.split('.');
  let newBirthday = parts[2] + '-' + parts[1] + '-' + parts[0];
  const dataBill = {
    email: loginField,
    firstName: fistnameField,
    lastName: lastnameField,
    password: passwordField,
    dateOfBirth: newBirthday,
    addresses: [
      {
        streetName: streetShipField,
        streetNumber: '45',
        postalCode: postalShipField,
        city: cityShipField,
        country: countryShipField.toLowerCase() === 'usa' ? 'US' : 'CA',
      },
      {
        streetName: streetBillField,
        streetNumber: '45',
        postalCode: postalBillField,
        city: postalBillField,
        country: countryBillField.toLowerCase() === 'usa' ? 'US' : 'CA',
      },
    ],
    defaultShippingAddress: 0,
    defaultBillingAddress: 1,
  };
  const dataShip = {
    email: loginField,
    firstName: fistnameField,
    lastName: lastnameField,
    password: passwordField,
    dateOfBirth: newBirthday,
    addresses: [
      {
        streetName: streetShipField,
        streetNumber: '45',
        postalCode: postalShipField,
        city: cityShipField,
        country: countryShipField.toLowerCase() === 'usa' ? 'US' : 'CA',
      },
    ],
    defaultShippingAddress: 0,
    defaultBillingAddress: 0,
  };
  if (checkedBill) {
    if (
      loginСheck === true &&
      passwordСheck === true &&
      firstnameСheck === true &&
      lastnameСheck === true &&
      streetShipСheck === true &&
      cityShipСheck === true &&
      postalShipСheck === true &&
      countryShipСheck === true &&
      birthdayСheck === true &&
      streetBillСheck === true &&
      cityBillСheck === true &&
      postalBillСheck === true &&
      countryBillСheck === true
    ) {
      createCustomerMe(dataBill, dispatch, navigator);
      // navigator('/');
    }
  } else {
    if (
      loginСheck === true &&
      passwordСheck === true &&
      firstnameСheck === true &&
      lastnameСheck === true &&
      streetShipСheck === true &&
      cityShipСheck === true &&
      postalShipСheck === true &&
      countryShipСheck === true &&
      birthdayСheck === true
    ) {
      createCustomerMe(dataShip, dispatch, navigator)
        .then((response) => {
          if (response) {
            localStorage.setItem('customerId', response.body.customer.id);
            dispatch(createCustomerId(response.body.customer.id));
          }
        })
        .then(() => {
          const token = getCustomerToken(loginField, passwordField);
          return token;
        })
        .then((response) => {
          localStorage.setItem('refreshToken', response.refresh_token);
        });
      // navigator('/');
    }
  }
};
