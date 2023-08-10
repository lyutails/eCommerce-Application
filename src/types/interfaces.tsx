import { ReactNode } from 'react';

export interface ICustomerFields {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  building: string;
  apartment: string;
}

export interface ICustomerParam {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: {
    streetName: string;
    streetNumber: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    building: string;
    apartment: string;
  }[];
}

export interface IInputFields {
  email: IInputCustomFields;
  password: IInputCustomFields;
}

export interface IInputCustomFields {
  type: string;
  placeholder: string;
  img1: string;
  img2?: string;
}

export interface IButtonFields {
  login: IButtonCustomFields;
  registration: IButtonCustomFields;
}

export interface IButtonCustomFields {
  classNames: string;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export interface IRootState {
  user: {
    isAuth: boolean;
  };
}
