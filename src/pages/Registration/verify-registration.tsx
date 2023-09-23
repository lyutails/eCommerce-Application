import { createCustomerMe } from '../../api/createCustomer';
import { AnyAction, Dispatch } from 'redux';
import {
  createCustomerId,
  setAccessTokenStatus,
  setRefreshTokenStatus,
} from '../../store/reducers/userReducer';
import { getCustomerToken, refreshTokenFlow } from '../../api/adminBuilder';
import { parseDateToServer } from '../../utils/parseDate';
import { changeVersion } from '../../store/reducers/profileReducer';
import {
  IAnonymousCartData,
  IMyCustomerDraft,
  IRegistrationData,
} from '../../types/interfaces';
import { changeAnonymousCart } from '../../store/reducers/cartReducer';

export const handleСreationReg = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  dispatch: Dispatch<AnyAction>,
  registrationData: IRegistrationData,
  setSuccessfulMessage: React.Dispatch<React.SetStateAction<boolean>>,
  anonymousCartData: IAnonymousCartData,
  setUnsuccessfulMessage: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  e.preventDefault();

  const createCustomerData: IMyCustomerDraft = {
    email: registrationData.bio.email.value,
    firstName: registrationData.bio.firstname.value,
    lastName: registrationData.bio.lastname.value,
    password: registrationData.password.currentPassword.value,
    dateOfBirth: parseDateToServer(registrationData.bio.birthday.value),
    addresses: [
      {
        streetName: registrationData.addressShip.street.value,
        building: registrationData.addressShip.building.value,
        apartment: registrationData.addressShip.apartment.value,
        postalCode: registrationData.addressShip.postal.value,
        city: registrationData.addressShip.city.value,
        country: registrationData.addressShip.country.value,
      },
    ],
    defaultShippingAddress: registrationData.checkedShipping ? 0 : undefined,
    shippingAddresses: [0],
    billingAddresses: [0],
    anonymousCart: {
      id: anonymousCartData.cartID,
      typeId: 'cart',
    },
    anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
    anonymousID: anonymousCartData.anonymousID,
  };

  function registerCustomer(): void {
    refreshTokenFlow(anonymousCartData.anonymousRefreshToken).then(
      (response) => {
        createCustomerMe(
          createCustomerData,
          response.access_token,
          dispatch,
          setSuccessfulMessage,
          setUnsuccessfulMessage
        )
          .then((responseTwo) => {
            if (responseTwo) {
              localStorage.removeItem('anonymousID');
              localStorage.removeItem('refreshAnonToken');
              localStorage.setItem('customerId', responseTwo.body.customer.id);
              dispatch(changeAnonymousCart({ anonymousRefreshToken: '' }));
              dispatch(createCustomerId(responseTwo.body.customer.id));
              dispatch(changeVersion(responseTwo.body.customer.version));
            }
            const token = getCustomerToken(
              registrationData.bio.email.value,
              registrationData.password.currentPassword.value
            );
            return token;
          })
          .then((responseThree) => {
            if (responseThree.refresh_token) {
              localStorage.setItem('refreshToken', responseThree.refresh_token);
            }
            dispatch(setRefreshTokenStatus(responseThree.refresh_token));
            dispatch(setAccessTokenStatus(responseThree.access_token));
          })
          .catch((error) => {
            if (error) {
              setUnsuccessfulMessage(true);
            }
          });
      }
    );
  }

  if (
    registrationData.bio.email.isChecked &&
    registrationData.password.currentPassword.isChecked &&
    registrationData.bio.firstname.isChecked &&
    registrationData.bio.lastname.isChecked &&
    registrationData.addressShip.street.isChecked &&
    registrationData.addressShip.city.isChecked &&
    registrationData.addressShip.postal.isChecked &&
    registrationData.addressShip.country.isChecked &&
    registrationData.bio.birthday.isChecked &&
    registrationData.addressShip.building.isChecked &&
    registrationData.addressShip.apartment.isChecked
  ) {
    if (registrationData.checkedInput) {
      createCustomerData.addresses.push({
        streetName: registrationData.addressBill.street.value,
        building: registrationData.addressBill.building.value,
        apartment: registrationData.addressBill.apartment.value,
        postalCode: registrationData.addressBill.postal.value,
        city: registrationData.addressBill.city.value,
        country: registrationData.addressBill.country.value,
      });
      if (
        registrationData.addressBill.street.isChecked &&
        registrationData.addressBill.building.isChecked &&
        registrationData.addressBill.apartment.isChecked &&
        registrationData.addressBill.postal.isChecked &&
        registrationData.addressBill.city.isChecked &&
        registrationData.addressBill.country.isChecked
      ) {
        registerCustomer();
      }
    } else {
      registerCustomer();
    }
  }
};
