import { setAuthStatus } from '../../store/reducers/userReducer';
// import { input } from '../../store/reducers/userReducer';
import { NavigateFunction } from 'react-router-dom';
import { handleLoginInput, handlePasswordInput, clue } from '../verification';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

// eslint-disable-next-line prefer-const
let loginСheck = false;
let passwordСheck = false;

export const handleСreationAuth = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  setErrorLogin: React.Dispatch<React.SetStateAction<string>>,
  loginField: string,
  passwordField: string,
  navigator: NavigateFunction,
  setErrorPassword: React.Dispatch<React.SetStateAction<string>>,
  isAuth: boolean,
  dispatch: Dispatch<AnyAction>,
  setCheckmarkLogin: React.Dispatch<React.SetStateAction<boolean>>,
  setPasswordFlagError: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  e.preventDefault();
  loginСheck = handleLoginInput(
    loginField,
    setErrorLogin,
    loginСheck,
    setCheckmarkLogin
  );
  const passwordErr = handlePasswordInput(passwordField);
  Object.keys(passwordErr).map((key): void => {
    if (passwordErr[key].isError === true) {
      setErrorPassword(clue.invalidPassword);
      passwordСheck = false;
      setPasswordFlagError(true);
    } else {
      passwordСheck = true;
      setPasswordFlagError(false);
    }
  });
  console.log(passwordСheck, loginСheck);
  if (loginСheck === true && passwordСheck === true) {
    dispatch(setAuthStatus(true));
    console.log(isAuth);
    navigator('/');
  }
};
