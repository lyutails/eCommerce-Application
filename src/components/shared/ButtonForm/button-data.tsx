import { IButtonFields } from '../../../types/interfaces';

const buttonFields: IButtonFields = {
  login: {
    classNames: 'button_login',
    children: 'LogIn',
  },
  registration: {
    classNames: 'button_register',
    children: 'Register',
  },
};

export const { login, registration } = buttonFields;
