import {
  createCustomerId,
  setAccessTokenStatus,
  setRefreshTokenStatus,
} from '../../store/reducers/userReducer';
import { NavigateFunction } from 'react-router-dom';
import { handleLoginInput, handlePasswordInput } from '../verification';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { getCustomerToken, refreshTokenFlow } from '../../api/adminBuilder';
import { changeVersion } from '../../store/reducers/profileReducer';
import { IAnonymousCartData } from '../Registration/Registration';
import { loginAnonUser } from '../../api/existTokenFlow';
import { IMyCustomerLoginDraft } from '../../types/interfaces';
import { changeAnonymousCart } from '../../store/reducers/cartReducer';

let loginСheck = false;
let passwordСheck = false;

export const handleСreationAuth = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  setErrorLogin: React.Dispatch<React.SetStateAction<string>>,
  loginField: string,
  passwordField: string,
  navigator: NavigateFunction,
  setErrorPassword: React.Dispatch<React.SetStateAction<boolean>>,
  isAuth: boolean,
  dispatch: Dispatch<AnyAction>,
  setCheckmarkLogin: React.Dispatch<React.SetStateAction<boolean>>,
  setInvalidCredentials: React.Dispatch<React.SetStateAction<boolean>>,
  anonymousCartData: IAnonymousCartData,
  setSuccessfulMessage: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  e.preventDefault();
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
      setErrorPassword(true);
    } else {
      passwordСheck = true;
      setErrorPassword(false);
    }
  });
  const request: IMyCustomerLoginDraft = {
    email: loginField,
    password: passwordField,
    anonymousCart: {
      id: anonymousCartData.cartID,
      typeId: 'cart',
    },
    anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
    anonymousID: anonymousCartData.anonymousID,
  };

  if (loginСheck === true && passwordСheck === true) {
    refreshTokenFlow(anonymousCartData.anonymousRefreshToken).then(
      (response) => {
        loginAnonUser(
          response.access_token,
          request,
          dispatch,
          setSuccessfulMessage
        )
          .then((responseTwo) => {
            if (responseTwo) {
              localStorage.removeItem('anonymousID');
              localStorage.removeItem('refreshAnonToken');
              localStorage.setItem('customerId', responseTwo.body.customer.id);
              dispatch(changeAnonymousCart({ anonymousID: '' }));
              dispatch(changeAnonymousCart({ anonymousRefreshToken: '' }));
              dispatch(createCustomerId(responseTwo.body.customer.id));
              dispatch(changeVersion(responseTwo.body.customer.version));
            }
          })
          .then(() => {
            const token = getCustomerToken(loginField, passwordField);
            return token;
          })
          .then((responseThree) => {
            localStorage.setItem('refreshToken', responseThree.refresh_token);
            dispatch(setRefreshTokenStatus(responseThree.refresh_token));
            dispatch(setAccessTokenStatus(responseThree.access_token));
          })
          .catch((error) => {
            if (error) {
              setInvalidCredentials(true);
            }
          });
      }
    );
  }
};
