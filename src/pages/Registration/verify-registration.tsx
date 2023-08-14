/* eslint-disable prefer-const */
import { NavigateFunction } from 'react-router-dom';
import {
  clue,
  handlCountryShipInput,
  handleCityShipInput,
  handleFirstnameInput,
  handleLastnameInput,
  handleLoginInput,
  handlePasswordInput,
  handlePostalShipInput,
  handleStreetShipInput,
} from '../verification';

let loginСheck = false;
let passwordСheck = false;
let firstnameСheck = false;
let lastnameСheck = false;
let streetShipСheck = false;
let cityShipСheck = false;
let postalShipСheck = false;
let countryShipСheck = false;

export const handleСreationReg = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  setErrorLogin: React.Dispatch<React.SetStateAction<string>>,
  setErrorFirstname: React.Dispatch<React.SetStateAction<string>>,
  setErrorLastname: React.Dispatch<React.SetStateAction<string>>,
  setErrorStreetShip: React.Dispatch<React.SetStateAction<string>>,
  setErrorCityShip: React.Dispatch<React.SetStateAction<string>>,
  setErrorPostalShip: React.Dispatch<React.SetStateAction<string>>,
  setErrorCountryShip: React.Dispatch<React.SetStateAction<string>>,
  loginField: string,
  passwordField: string,
  fistnameField: string,
  lastnameField: string,
  streetShipField: string,
  cityShipField: string,
  postalShipField: string,
  countryShipField: string,
  navigator: NavigateFunction,
  setErrorPassword: React.Dispatch<React.SetStateAction<string>>
): void => {
  e.preventDefault();
  handleLoginInput(loginField, setErrorLogin, loginСheck);
  // const passwordErr = handlePasswordInput(passwordField);
  // Object.keys(passwordErr).map((key): void => {
  //   if (passwordErr[key].isError === true) {
  //     setErrorPassword(clue.invalidPassword);
  //     passwordСheck = false;
  //   } else {
  //     setErrorPassword('Completed');
  //     passwordСheck = true;
  //   }
  // });
  handleFirstnameInput(fistnameField, setErrorFirstname, firstnameСheck);
  handleLastnameInput(lastnameField, setErrorLastname, lastnameСheck);
  handleStreetShipInput(streetShipField, setErrorStreetShip, streetShipСheck);
  handleCityShipInput(cityShipField, setErrorCityShip, cityShipСheck);
  handlePostalShipInput(postalShipField, setErrorPostalShip, postalShipСheck);
  handlCountryShipInput(
    countryShipField,
    setErrorCountryShip,
    countryShipСheck
  );
  if (loginСheck === true && passwordСheck === true) {
    navigator('/');
  }
};
