import { ButtonFields } from '../../../types/interfaces';
import style from '../../FormComponent/_form.module.scss';

const buttonFields: ButtonFields = {
  login: {
    classNames: style.button_login,
    children: 'LogIn',
  },
  registration: {
    classNames: 'button_register',
    children: 'Register',
  },
};

export const { login, registration } = buttonFields;
