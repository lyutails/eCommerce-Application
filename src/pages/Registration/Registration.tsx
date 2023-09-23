import style from '../Registration/_registration.module.scss';
import Input from '../../components/Input/Input';
import ButtonForm from '../../components/shared/ButtonForm/Button';
import iconCheckmark from '../../../public/assets/icons/checkmark.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  clue,
  handleBirthdayInputTwo,
  handleFirstnameInputTwo,
  handleLastnameInputTwo,
  handleLoginInputTwo,
  handlePasswordInput,
  inputHandler,
  selectHandler,
} from '../verification';
import { handleСreationReg } from './verify-registration';
import InputBirthDateMask from '../../components/Input/InputBirthDateMask';
import { handleCheckbox } from '../../utils/handleCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '../../../public/assets/icons/close.svg';
import InputPassword from '../../components/Input/inputPassword';
import {
  IAddressDraftState,
  IAddressInput,
  ICartState,
  IProfileState,
  IRegistrationState,
  IRootState,
} from '../../types/interfaces';
import { setAuthStatus } from '../../store/reducers/userReducer';
import {
  changeAddressShipReg,
  changeAddressBillReg,
  changeBioReg,
} from '../../store/reducers/registrationReducer';
import { checkPasswordError } from '../verificationTwo';
import { changePassword } from '../../store/reducers/profileReducer';
import InputPasswordTwo from '../../components/Input/inputPasswordTwo';
import AddressForm from '../../components/AddressForm/AddressForm';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

export interface IAnonymousCartData {
  anonymousID: string;
  versionAnonCart: number;
  cartID: string;
  anonymousRefreshToken: string;
  anonymousAccessToken: string;
}

const addressFormShippingData = {
  title: 'Shipping address',
  checboxId: 'address-modal-id',
};

const addressFormBillingData = {
  title: 'Billing address',
  checboxId: 'address-modal-id',
};

export interface IRegistrationData {
  bio: { [key: string]: IAddressInput };
  password: { [key: string]: IAddressInput };
  addressShip: IAddressDraftState;
  addressBill: IAddressDraftState;
  checkedInput: boolean;
  checkedShipping: boolean;
  checkedBilling: boolean;
}

const createModal = (): JSX.Element => {
  return (
    <div className={`${style.overlay}`}>
      <div className={`${style.modal_visible} ${style.modal}`}>
        Dear user,
        <br /> your Profile was successfully created,
        <br /> we&apos;re glad you joined us
      </div>
    </div>
  );
};

function RegistrationPage(): JSX.Element {
  //const isAuth = useSelector((state: IRootState) => state.user.isAuth);
  const { bio, addressShip, addressBill } = useSelector(
    (state: IRegistrationState) => state.registration
  );
  const { password } = useSelector((state: IProfileState) => state.profile);
  const { anonymousCart } = useSelector((state: ICartState) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleToLogin = (): void => {
    navigate('/login');
  };

  const [checkedInput, setCheckedInput] = useState(false);

  const [modal, setModal] = useState<JSX.Element | undefined>(undefined);

  const [successfulMessage, setSuccessfulMessage] = useState(false);
  const [unsuccessfulMessage, setUnsuccessfulMessage] = useState(false);

  const [checkedShipping, setCheckedShipping] = useState(false);
  const [checkedBilling, setCheckedBilling] = useState(false);

  useEffect(() => {
    if (successfulMessage) {
      setModal(createModal());
      setTimeout(() => {
        dispatch(setAuthStatus(true));
        localStorage.setItem('isAuth', 'true');
      }, 5300);
    }
  }, [dispatch, successfulMessage]);

  const setInputAction = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    checkErrorInput: (inputField: string) => string | boolean,
    method:
      | ActionCreatorWithPayload<unknown, 'registration/changeBioReg'>
      | ActionCreatorWithPayload<unknown, 'profile/changePassword'>
  ): void => {
    const errorMessage = checkErrorInput(event.target.value);
    dispatch(
      method({
        [fieldName]: {
          value: event.target.value,
          error: !!errorMessage,
          isChecked: !errorMessage,
        },
      })
    );
  };

  const registrationData = {
    bio: bio,
    password: password,
    addressShip: addressShip,
    addressBill: addressBill,
    checkedInput: checkedInput,
    checkedShipping: checkedShipping,
    checkedBilling: checkedBilling,
  };

  const setInputBirthdayAction = (
    value: string,
    fieldName: string,
    checkErrorInput: (streetShipField: string) => string
  ): void => {
    const errorMessage = checkErrorInput(value);
    dispatch(
      changeBioReg({
        [fieldName]: {
          value: value,
          error: errorMessage,
          isChecked: !errorMessage,
        },
      })
    );
  };

  const inputElementsData = [
    {
      value: bio.firstname.value,
      type: 'text',
      name: 'firstname',
      function: handleFirstnameInputTwo,
      changeStore: changeBioReg,
      clue: bio.firstname.error,
      placeholder: 'First name *',
      classWrapper: style.firstname,
      classInput: style.firstname_input,
      childrenBefore: bio.firstname.isChecked,
    },
    {
      value: bio.lastname.value,
      type: 'text',
      name: 'lastname',
      function: handleLastnameInputTwo,
      changeStore: changeBioReg,
      clue: bio.lastname.error,
      placeholder: 'Last name *',
      classWrapper: style.lastname,
      classInput: style.lastname_input,
      childrenBefore: bio.lastname.isChecked,
    },
    {
      value: bio.email.value,
      type: 'email',
      name: 'email',
      function: handleLoginInputTwo,
      changeStore: changeBioReg,
      clue: bio.email.error,
      placeholder: 'E-mail *',
      classWrapper: style.email,
      classInput: style.email_input,
      childrenBefore: bio.email.isChecked,
    },
  ];
  const inputElements = inputElementsData.map((data, i) => {
    return (
      <Input
        key={i}
        value={data.value}
        onChange={(e): void =>
          setInputAction(e, data.name, data.function, data.changeStore)
        }
        type={data.type}
        clue={data.clue ? data.clue : 'This is required field'}
        placeholder={data.placeholder}
        classWrapper={data.classWrapper}
        classClue={
          data.clue ? `${style.completed} ${style.error}` : style.uncompleted
        }
        classInput={data.classInput}
        childrenBefore={
          <div
            className={`${style.wrapper_img} ${
              data.childrenBefore ? style.completed : style.uncompleted
            }`}
          >
            <img
              className={style.wrapper_img_icon}
              src={iconCheckmark}
              alt="Icon"
            />
          </div>
        }
      />
    );
  });
  return (
    <div className={modal ? style.registriation_visible : style.login}>
      <div className={style.authorization}>
        <h2 className={style.title}>LogIn</h2>
        <ButtonForm
          onClick={handleToLogin}
          classNames={style.authorization_button}
        >
          LogIn
        </ButtonForm>
      </div>
      <div className={style.registration}>
        <h2 className={style.title}>Registration</h2>
        <form action="" className={style.registration_form}>
          {inputElements}
          <InputPasswordTwo
            onChange={(e): void =>
              setInputAction(
                e,
                'currentPassword',
                checkPasswordError,
                changePassword
              )
            }
            checkmarkPassword={password.currentPassword.isChecked}
            passwordError={!!password.currentPassword.error}
            passwordField={'currentPassword'}
            tooltipColor={style.tooltip_color}
            clueError={style.password_error}
            clueColor={style.modal_color}
            placeholder="Password *"
          />
          <InputBirthDateMask
            onAccept={(value: string): void => {
              setInputBirthdayAction(value, 'birthday', handleBirthdayInputTwo);
            }}
            clue={
              bio.birthday.error
                ? bio.birthday.error
                : `Enter Date of birth in format DD.MM.YYYY. Your age should be equal or more than 13 to register`
            }
            type="text"
            placeholder="dd.mm.yyyy *"
            classWrapper={style.birth}
            classClue={
              bio.birthday.error
                ? `${style.completed} ${style.error}`
                : style.uncompleted
            }
            classInput={style.birth_input}
            childrenBefore={
              <div
                className={`${style.wrapper_img} ${
                  bio.birthday.isChecked ? style.completed : style.uncompleted
                }`}
              >
                <img
                  className={style.wrapper_img_icon}
                  src={iconCheckmark}
                  alt="Icon"
                />
              </div>
            }
          />
          <h3 className={style.registration_title}>Address</h3>
          <div className={style.shipping}>
            <AddressForm
              addressStore={addressShip}
              titleStyle={style.address_title}
              addressData={addressFormShippingData}
              dispatchMethod="shippingRegistration"
              setDefault={
                <div>
                  <input
                    onChange={(e): void =>
                      handleCheckbox(e, setCheckedShipping)
                    }
                    className={style.address_input}
                    id="default-shipping"
                    name="address"
                    type="checkbox"
                  />
                  <label
                    htmlFor="default-shipping"
                    className={style.address_label}
                  >
                    Set as default shipping address
                  </label>
                </div>
              }
              addBillingAddress={
                <div>
                  <input
                    onChange={(e): void => handleCheckbox(e, setCheckedInput)}
                    className={style.checkbox_input}
                    id="address"
                    name="address"
                    type="checkbox"
                  />
                  <label htmlFor="address" className={style.checkbox}>
                    Click here if the shipping and billing addresses are
                    different
                  </label>
                </div>
              }
            />
          </div>

          <div
            className={
              checkedInput
                ? `${style.visible} ${style.billing}`
                : `${style.hide} ${style.billing}`
            }
          >
            <AddressForm
              addressStore={addressBill}
              titleStyle={style.address_title}
              addressData={addressFormBillingData}
              dispatchMethod="billingRegistration"
              setDefault={
                <div>
                  <input
                    onChange={(e): void => handleCheckbox(e, setCheckedBilling)}
                    className={style.address_input}
                    id="default-billing"
                    name="address"
                    type="checkbox"
                  />
                  <label
                    htmlFor="default-billing"
                    className={style.address_label}
                  >
                    Set as default billing address
                  </label>
                </div>
              }
            />
          </div>

          <ButtonForm
            onClick={(event): void =>
              handleСreationReg(
                event,
                dispatch,
                registrationData,
                setSuccessfulMessage,
                anonymousCart,
                setUnsuccessfulMessage
              )
            }
            classNames={style.registration_button}
            type="submit"
          >
            SignUp
          </ButtonForm>
        </form>
      </div>
      <div>{modal}</div>
      <div
        className={`${style.overlay} ${
          unsuccessfulMessage ? style.flex : style.hide
        }`}
      >
        <div className={`${style.modal_visible} ${style.modal}`}>
          <div className={style.modal_message}>
            Dear user,
            <br /> customer with provided Email already exist!
            <br /> Please go to the login form or enter another email.
          </div>
          <ButtonForm
            classNames={style.modal_close}
            onClick={(): void => setUnsuccessfulMessage(false)}
          >
            Close
          </ButtonForm>
        </div>
      </div>
    </div>
  );
}
export default RegistrationPage;
