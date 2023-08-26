import { createCustomerId } from '../../store/reducers/userReducer';
import { NavigateFunction } from 'react-router-dom';
import { handleLoginInput, handlePasswordInput, clue } from '../verification';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { loginCustomerThroughMe } from '../../api/passwordFlowSession';
import { getCustomerToken } from '../../api/adminBuilder';
/* 
eslint-disable-next-line prefer-const */
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
  setInvalidCredentials: React.Dispatch<React.SetStateAction<boolean>>
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
  const request = {
    email: loginField,
    password: passwordField,
  };
  if (loginСheck === true && passwordСheck === true) {
    loginCustomerThroughMe(request, dispatch, navigator)
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
      })
      .catch((error) => {
        if (error) {
          setInvalidCredentials(true);
        }
      });
  }
};
