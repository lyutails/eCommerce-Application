/* eslint-disable prefer-const */
import { createCustomerMe } from '../../api/createCustomer';
import { NavigateFunction } from 'react-router-dom';
import {
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
  handleBuildingBillInput,
  handleBuildingShipInput,
  handleApartmentBillInput,
  handleApartmentShipInput,
} from '../verification';
import { AnyAction, Dispatch } from 'redux';
import {
  createCustomerId,
  setAccessTokenStatus,
  setRefreshTokenStatus,
} from '../../store/reducers/userReducer';
import { getCustomerToken } from '../../api/adminBuilder';
import { loginCustomerThroughReg } from '../../api/passwordFlowSession';
import { parseDateToServer } from '../../utils/parseDate';
import { changeVersion } from '../../store/reducers/profileReducer';
import { ICartState } from '../../types/interfaces';
import { IAnonymousCartData } from './Registration';

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
let buildingBillСheck = false;
let buildingShipСheck = false;
let apartmentBillСheck = false;
let apartmentShipСheck = false;

export const handleСreationReg = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  setErrorLogin: React.Dispatch<React.SetStateAction<string>>,
  setErrorPassword: React.Dispatch<React.SetStateAction<boolean>>,
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
  setErrorApartmentBill: React.Dispatch<React.SetStateAction<string>>,
  setErrorBuildingBill: React.Dispatch<React.SetStateAction<string>>,
  setErrorApartmentShip: React.Dispatch<React.SetStateAction<string>>,
  setErrorBuildingShip: React.Dispatch<React.SetStateAction<string>>,
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
  apartmentBillField: string,
  buildingBillField: string,
  apartmentShipField: string,
  buildingShipField: string,
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
  setCheckmarkApartmentBill: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckmarkBuildingBill: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckmarkApartmentShip: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckmarkBuildingShip: React.Dispatch<React.SetStateAction<boolean>>,
  checkedBill: boolean,
  setInvalidCredentials: React.Dispatch<React.SetStateAction<boolean>>,
  checkedShipping: boolean,
  checkedBilling: boolean,
  setSuccessfulMessage: React.Dispatch<React.SetStateAction<boolean>>,
  anonymousCartData: IAnonymousCartData
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
    setCheckmarkPostalShip,
    countryShipField
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
    setCheckmarkPostalBill,
    countryBillField
  );
  countryBillСheck = handleCountryBillInput(
    countryBillField,
    setErrorCountryBill,
    countryBillСheck,
    setCheckmarkCountryBill
  );
  buildingBillСheck = handleBuildingBillInput(
    buildingBillField,
    setErrorBuildingBill,
    buildingBillСheck,
    setCheckmarkBuildingBill
  );
  buildingShipСheck = handleBuildingShipInput(
    buildingShipField,
    setErrorBuildingShip,
    buildingShipСheck,
    setCheckmarkBuildingShip
  );
  apartmentBillСheck = handleApartmentBillInput(
    apartmentBillField,
    setErrorApartmentBill,
    apartmentBillСheck,
    setCheckmarkApartmentBill
  );
  apartmentShipСheck = handleApartmentShipInput(
    apartmentShipField,
    setErrorApartmentShip,
    apartmentShipСheck,
    setCheckmarkApartmentShip
  );
  const passwordErr = handlePasswordInput(passwordField);
  Object.keys(passwordErr).every((key): void => {
    if (passwordErr[key].isError === true) {
      passwordСheck = false;
      setErrorPassword(true);
    } else {
      setCheckmarkPassword(true);
      passwordСheck = true;
      setErrorPassword(false);
    }
  });
  birthdayСheck = handleBirthdayInput(
    birthdayField,
    setErrorBirthday,
    birthdayСheck,
    setCheckmarkBirthday
  );

  // const dataBill = {
  //   email: loginField,
  //   firstName: fistnameField,
  //   lastName: lastnameField,
  //   password: passwordField,
  //   dateOfBirth: parseDateToServer(birthdayField),
  //   addresses: [
  //     {
  //       streetName: streetShipField,
  //       building: buildingShipField,
  //       apartment: apartmentShipField,
  //       postalCode: postalShipField,
  //       city: cityShipField,
  //       country: countryShipField === 'usa' ? 'US' : 'CA',
  //     },
  //     {
  //       streetName: streetBillField,
  //       building: buildingBillField,
  //       apartment: apartmentBillField,
  //       postalCode: postalBillField,
  //       city: postalBillField,
  //       country: countryBillField === 'usa' ? 'US' : 'CA',
  //     },
  //   ],
  //   defaultShippingAddress: checkedShipping ? 0 : undefined,
  //   shippingAddresses: [0],
  //   defaultBillingAddress: checkedBilling ? 1 : undefined,
  //   billingAddresses: [1],
  // };

  const createCustomerData = {
    email: loginField,
    firstName: fistnameField,
    lastName: lastnameField,
    password: passwordField,
    dateOfBirth: parseDateToServer(birthdayField),
    addresses: [
      {
        streetName: streetShipField,
        building: buildingShipField,
        apartment: apartmentShipField,
        postalCode: postalShipField,
        city: cityShipField,
        country: countryShipField.toLowerCase() === 'usa' ? 'US' : 'CA',
      },
    ],
    defaultShippingAddress: checkedShipping ? 0 : undefined,
    shippingAddresses: [0],
    billingAddresses: [0],
  };

  if (anonymousCartData.anonymousID) {
    createCustomerData.anonymousCart = {
      id: anonymousCartData.cartID,
      typeId: 'cart',
    };
  }

  if (checkedBill) {
    createCustomerData.addresses.push({
      streetName: streetBillField,
      building: buildingBillField,
      apartment: apartmentBillField,
      postalCode: postalBillField,
      city: postalBillField,
      country: countryBillField === 'usa' ? 'US' : 'CA',
    });
  }

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
      countryBillСheck === true &&
      buildingBillСheck === true &&
      buildingShipСheck === true &&
      apartmentBillСheck === true &&
      apartmentShipСheck === true
    ) {
      createCustomerMe(
        createCustomerData,
        setSuccessfulMessage,
        anonymousCartData,
        dispatch
      )
        .then((response) => {
          if (response) {
            localStorage.setItem('customerId', response.body.customer.id);
            localStorage.removeItem('anonymousID');
            dispatch(createCustomerId(response.body.customer.id));
            dispatch(changeVersion(response.body.customer.version));
          }
        })
        .then(() => {
          const token = getCustomerToken(loginField, passwordField);
          return token;
        })
        .then((response) => {
          localStorage.setItem('refreshToken', response.refresh_token);
          dispatch(setRefreshTokenStatus(response.refresh_token));
          dispatch(setAccessTokenStatus(response.access_token));
        })
        .catch((error) => {
          if (error) {
            setErrorLogin('Invalid email or password');
            setCheckmarkLogin(false);
            setInvalidCredentials(true);
          }
        });
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
      birthdayСheck === true &&
      buildingShipСheck === true &&
      apartmentShipСheck === true
    ) {
      createCustomerMe(
        createCustomerData,
        setSuccessfulMessage,
        anonymousCartData,
        dispatch
      )
        .then((response) => {
          if (response) {
            localStorage.removeItem('anonymousID');
            localStorage.setItem('customerId', response.body.customer.id);
            dispatch(createCustomerId(response.body.customer.id));
            dispatch(changeVersion(response.body.customer.version));
          }
        })
        .then(() => {
          const token = getCustomerToken(loginField, passwordField);
          return token;
        })
        .then((response) => {
          localStorage.setItem('refreshToken', response.refresh_token);
          dispatch(setRefreshTokenStatus(response.refresh_token));
          dispatch(setAccessTokenStatus(response.access_token));
        })
        .catch((error) => {
          if (error) {
            setErrorLogin('Invalid email or password');
            setCheckmarkLogin(false);
            setInvalidCredentials(true);
          }
        });
    }
  }
};
