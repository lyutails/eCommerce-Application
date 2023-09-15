import {
  AddressDraft,
  BaseAddress,
  DiscountCodeInfo,
  LineItem,
  MyCustomerChangeEmailAction,
} from '@commercetools/platform-sdk';
import { ChangeEventHandler, ReactNode } from 'react';
import { AnyAction, Dispatch } from 'redux';

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
  onAccept?: (value: string) => void;
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
    customerRefreshToken: string;
    accessToken: string;
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
      [key: string]: IAddressInput;
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

export interface IProductState {
  product: {
    productImg: string[];
    flagInModalWindow: boolean;
  };
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
  anonymousCart?: {
    id: string;
    typeId: string;
  };
  anonymousCartSignInMode?: string;
  anonymousID?: string;
}

export interface IMyCustomerLoginDraft {
  email: string;
  password: string;
  anonymousCart?: {
    id: string;
    typeId: string;
  };
  anonymousCartSignInMode?: string;
  anonymousID?: string;
}

export interface ICategoryState {
  category: {
    category: string[];
  };
}

export interface ICartState {
  cart: {
    anonymousCart: {
      anonymousID: string;
      versionAnonCart: number;
      cartID: string;
      anonymousRefreshToken: string;
      anonymousAccessToken: string;
    };
    discountCodes: [{ name: string; id: string }];
    userCart: {
      userCartId: string;
      versionUserCart: number;
    };
    cartItems: LineItem[];
    cartPrice: number;
    cartQuantity: number;
    promocode: string;
    cartPriceDiscount: number;
    discountCodesCart: DiscountCodeInfo[] | undefined;
  };
}

export interface IMyCartUpdate {
  version: number;
  actions: IMyCartUpdateAction[];
}

export type IMyCartUpdateAction =
  | IMyCartAddLineItemAction
  | IMyCartRemoveLineItemAction
  | IMyCartAddDiscountCodeAction
  | IMyCartDeleteDiscountCodeAction;

export interface IMyCartAddLineItemAction {
  action: string;
  sku: string;
  quantity: number;
}

export interface IMyCartAddDiscountCodeAction {
  action: string;
  code: string;
}
export interface IMyCartDeleteDiscountCodeAction {
  action: string;
  discountCode: {
    typeId: string;
    id: string;
  };
}

export interface IMyCartRemoveLineItemAction {
  action: string;
  lineItemId: string;
  quantity: number;
}

export interface IRefreshTokenData {
  access_token: string;
  expires_at: number;
  expires_in: number;
  scope: string;
  token_type: string;
  refresh_token?: string;
}

export interface IAddressFormProps {
  addBillingAddress?: ReactNode;
  addressData: IAddressDataObject;
  setDefault?: ReactNode;
  setAddressStatus?: ReactNode;
  titleStyle: string;
}

export interface IAddressDataObject {
  title: string;
  checboxId: string;
}

export interface IAddressModalProps {
  modalClass: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  version: number;
  token?: string;
  setClickedAddressesUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IAddressUpdateData {
  streetError: boolean;
  buildingError: boolean;
  cityError: boolean;
  apartmentError: boolean;
  postalError: boolean;
  countryError: boolean;
  token: string;
}

export interface IChangeAddressData {
  version: number;
  actions: [
    {
      action: string;
      addressId: string;
      address: {
        streetName: string;
        building: string;
        apartment: string;
        postalCode: string;
        city: string;
        country: string;
      };
    },
    {
      action: string;
      addressId: string;
    }?,
    {
      action: string;
      addressId: string;
    }?,
    {
      action: string;
      addressId: string;
    }?,
    {
      action: string;
      addressId: string;
    }?,
  ];
}

export interface IAddAddressData {
  version: number;
  actions: [
    {
      action: string;
      address: {
        key: string;
        streetName: string;
        building: string;
        apartment: string;
        postalCode: string;
        city: string;
        country: string;
      };
    },
    {
      action: string;
      addressKey: string;
    }?,
    {
      action: string;
      addressKey: string;
    }?,
    {
      action: string;
      addressKey: string;
    }?,
    {
      action: string;
      addressKey: string;
    }?,
  ];
}

export interface IAddAddressStatusData {
  version: number;
  actions: [
    {
      action: string;
      addressId: string;
    }?,
    {
      action: string;
      addressId: string;
    }?,
    {
      action: string;
      addressId: string;
    }?,
    {
      action: string;
      key: string;
    }?,
  ];
}

export interface IBioModalProps {
  modalClass: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  token?: string;
  setClickedBioUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IBioUpdateData {
  firstnameError: boolean;
  lastnameError: boolean;
  birthdayError: boolean;
  token: string;
}

export interface IEmailModalProps {
  modalClass: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  token?: string;
  setClickedEmailUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IMyCustomerEmailUpdate {
  version: number;
  actions: [MyCustomerChangeEmailAction];
}

export interface IPasswordModalProps {
  modalClass: string;
  token: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  setClickedPasswordUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IPasswordUpdateData {
  currentError: boolean;
  newError: boolean;
  repeateError: boolean;
  token: string;
  passwordNewField: string;
  passwordRepeatField: string;
  dispatch: Dispatch<AnyAction>;
  login: string;
  currentPassword: {
    value: string;
    error: boolean;
    isChecked: boolean;
  };
}

// yana3@mail.com
// 22327Ybv!
