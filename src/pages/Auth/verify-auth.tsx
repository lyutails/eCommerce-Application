import {
  createCustomerId,
  setAccessTokenStatus,
  setAuthStatus,
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
import { ILoginCustomerData } from './Auth';

// let loginСheck = false;
// let passwordСheck = false;

export const handleСreationAuth = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  loginCustomerData: ILoginCustomerData,
  dispatch: Dispatch<AnyAction>,
  setInvalidCredentials: React.Dispatch<React.SetStateAction<boolean>>,
  anonymousCartData: IAnonymousCartData,
  setSuccessfulMessage: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  e.preventDefault();
  const request: IMyCustomerLoginDraft = {
    email: loginCustomerData.email,
    password: loginCustomerData.password,
    anonymousCart: {
      id: anonymousCartData.cartID,
      typeId: 'cart',
    },
    anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
    anonymousID: anonymousCartData.anonymousID,
  };

  if (loginCustomerData.loginError && loginCustomerData.passwordError) {
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
              localStorage.setItem('customerId', responseTwo.body.customer.id);
              dispatch(changeAnonymousCart({ anonymousID: '' }));
              dispatch(changeAnonymousCart({ anonymousRefreshToken: '' }));
              dispatch(createCustomerId(responseTwo.body.customer.id));
              dispatch(changeVersion(responseTwo.body.customer.version));
            }
            const token = getCustomerToken(
              loginCustomerData.email,
              loginCustomerData.password
            );
            return token;
          })
          .then((responseThree) => {
            if (responseThree.refresh_token) {
              localStorage.setItem('refreshToken', responseThree.refresh_token);
            }
            dispatch(setRefreshTokenStatus(responseThree.refresh_token));
            dispatch(setAccessTokenStatus(responseThree.access_token));
            localStorage.removeItem('anonymousID');
            localStorage.removeItem('refreshAnonToken');
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
