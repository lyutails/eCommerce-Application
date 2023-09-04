import { AddressDraft, BaseAddress } from '@commercetools/platform-sdk';
import { ChangeEventHandler, ReactNode } from 'react';

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

export interface IInputProps {
  type: string;
  classInput: string;
  classClue: string;
  classWrapper: string;
  placeholder: string;
  childrenBefore?: ReactNode;
  childrenAfter?: ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  clue?: string;
  tooltip?: ReactNode;
  value?: string;
  max?: string;
  onfocus?: ChangeEventHandler<HTMLInputElement>;
  onblur?: ChangeEventHandler<HTMLInputElement>;
}

export interface IInputPropsPassword {
  placeholder: string;
  passwordError: boolean;
  setPasswordField?: React.Dispatch<React.SetStateAction<string>>;
  passwordField: string;
  clueColor: string;
  clueError: string;
  tooltipColor?: string;
  setPasswordCheck?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  setCheckmarkPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  checkmarkPassword?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export interface IInputPropsMask {
  type: string;
  classInput: string;
  classClue: string;
  classWrapper: string;
  placeholder: string;
  childrenBefore?: ReactNode;
  childrenAfter?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAccept?: any;
  clue?: string;
  tooltip?: ReactNode;
  value?: string;
  max?: string;
  onblur?: ChangeEventHandler<HTMLInputElement>;
}

export interface IButtonFields {
  login: IButtonCustomFields;
  registration: IButtonCustomFields;
}

export interface IButtonCustomFields {
  classNames: string;
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

export interface IRootState {
  user: {
    customerId: string;
    isAuth: boolean;
    refreshToken: string;
  };
}

interface IAddressInput {
  value: string;
  error: string;
  isChecked: boolean;
}

export interface IProfileState {
  profile: {
    address: {
      street: IAddressInput;
      building: IAddressInput;
      apartment: IAddressInput;
      city: IAddressInput;
      country: IAddressInput;
      postal: IAddressInput;
      defaultShipping: boolean;
      defaultBilling: boolean;
      shippingAddress: boolean;
      billingAddress: boolean;
      isUpdate: boolean;
      isAdd: boolean;
      idAddress: string;
      addressStore: AddressDraft[];
      defaultShippingId: string;
      defaultBillingId: string;
      shippingAddressesId: string[];
      billingAddressesId: string[];
    };
    bio: {
      firstname: IAddressInput;
      lastname: IAddressInput;
      birthday: IAddressInput;
    };
    email: IAddressInput;
    password: {
      [key: string]: {
        value: string;
        error: boolean;
        isChecked: boolean;
      };
    };
    version: number;
  };
}

export interface IPersonalState {
  personal: {
    information: boolean;
    addresses: boolean;
  };
}

export interface ICategoryState {
  category: string[];
}

export interface IPasswordErrors {
  [key: string]: IPasswordErrorsFields;
}

export interface IPasswordErrorsFields {
  text: string;
  isError: boolean;
}

export interface IMyCustomerDraft {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
  addresses: BaseAddress[];
  defaultShippingAddress?: number | undefined;
  shippingAddresses: number[];
  defaultBillingAddress?: number | undefined;
  billingAddresses: number[];
}

export interface IMyCustomerLoginDraft {
  email: string;
  password: string;
}
