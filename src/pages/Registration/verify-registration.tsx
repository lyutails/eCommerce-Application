/* eslint-disable prefer-const */
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
} from '../verification';

let loginСheck = false;
let passwordСheck = false;
let firstnameСheck = false;
let lastnameСheck = false;
let streetShipСheck = false;
let cityShipСheck = false;
let postalShipСheck = false;
let countryShipСheck = false;
let birthdayСheck = false;

export const handleСreationReg = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  setErrorLogin: React.Dispatch<React.SetStateAction<string>>,
  setErrorFirstname: React.Dispatch<React.SetStateAction<string>>,
  setErrorLastname: React.Dispatch<React.SetStateAction<string>>,
  setErrorStreetShip: React.Dispatch<React.SetStateAction<string>>,
  setErrorCityShip: React.Dispatch<React.SetStateAction<string>>,
  setErrorPostalShip: React.Dispatch<React.SetStateAction<string>>,
  setErrorCountryShip: React.Dispatch<React.SetStateAction<string>>,
  setErrorBirthday: React.Dispatch<React.SetStateAction<string>>,
  loginField: string,
  passwordField: string,
  fistnameField: string,
  lastnameField: string,
  streetShipField: string,
  cityShipField: string,
  postalShipField: string,
  countryShipField: string,
  birthdayField: string,
  navigator: NavigateFunction,
  setCheckmarkLogin: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckmarkPassword: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckmarkFirstname: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckmarkLastname: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckmarkStreetShip: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckmarkCityShip: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckmarkPostalShip: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckmarkCountryShip: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckmarkBirthday: React.Dispatch<React.SetStateAction<boolean>>
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
  const passwordErr = handlePasswordInput(passwordField);
  Object.keys(passwordErr).every((key): void => {
    if (passwordErr[key].isError === true) {
      passwordСheck = false;
    } else {
      setCheckmarkPassword(true);
      passwordСheck = true;
    }
  });
  birthdayСheck = handleBirthdayInput(
    birthdayField,
    setErrorBirthday,
    birthdayСheck,
    setCheckmarkBirthday
  );
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
    navigator('/');
  }
};
