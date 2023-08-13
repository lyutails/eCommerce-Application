import { NavigateFunction } from 'react-router-dom';
import { handleLoginInput, handlePasswordInput, clue } from '../verification';

// eslint-disable-next-line prefer-const
let loginСheck = false;
let passwordСheck = false;

export const handleСreationAuth = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  setErrorLogin: React.Dispatch<React.SetStateAction<string>>,
  loginField: string,
  passwordField: string,
  navigator: NavigateFunction,
  setErrorPassword: React.Dispatch<React.SetStateAction<string>>
): void => {
  e.preventDefault();
  handleLoginInput(loginField, setErrorLogin, loginСheck);
  const passwordErr = handlePasswordInput(passwordField);
  Object.keys(passwordErr).map((key): void => {
    if (passwordErr[key].isError === true) {
      setErrorPassword(clue.invalidPassword);
      passwordСheck = false;
    } else {
      setErrorPassword('Completed');
      passwordСheck = true;
    }
  });
  if (loginСheck === true && passwordСheck === true) {
    navigator('/');
  }
};
