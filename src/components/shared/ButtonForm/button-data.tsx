import { ButtonFields } from '../../../types/interfaces';

const buttonFields: ButtonFields = {
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
