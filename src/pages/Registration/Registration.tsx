import style from '../Registration/_registration.module.scss';
import Input from '../../components/Input/Input';
import ButtonForm from '../../components/shared/ButtonForm/Button';
import iconError from '../../../public/assets/icons/error.svg';
import iconCheckmark from '../../../public/assets/icons/checkmark.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  handlePasswordInput,
  inputHandler,
  selectHandler,
} from '../verification';
import { handleСreationReg } from './verify-registration';
import InputBirthDateMask from '../../components/Input/InputBirthDateMask';
import { handleCheckbox } from '../../utils/handleCheckbox';
import { hideTooltip, showTooltip } from '../showTooltip';
import { useDispatch, useSelector } from 'react-redux';
import InputPassword from '../../components/Input/inputPassword';
import { IRootState } from '../../types/interfaces';
import { setAuthStatus } from '../../store/reducers/userReducer';

function RegistrationPage(): JSX.Element {
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleToLogin = (): void => {
    navigate('/login');
  };

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [checkedInput, setCheckedInput] = useState(false);
  const [fistname, setFistname] = useState('');
  const [lastname, setLastname] = useState('');
  const [streetShip, setStreetShip] = useState('');
  const [cityShip, setCityShip] = useState('');
  const [postalShip, setPostalShip] = useState('');
  const [countryShip, setCountryShip] = useState('');
  const [streetBill, setStreetBill] = useState('');
  const [cityBill, setCityBill] = useState('');
  const [postalBill, setPostalBill] = useState('');
  const [countryBill, setCountryBill] = useState('');
  const [birthday, setBirthday] = useState('');
  const [buildingBill, setBuildingBill] = useState('');
  const [buildingShip, setBuildingShip] = useState('');
  const [apartmentBill, setApartmentBill] = useState('');
  const [apartmentShip, setApartmentShip] = useState('');

  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [fistnameError, setFistnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [streetShipError, setStreetShipError] = useState('');
  const [cityShipError, setCityShipError] = useState('');
  const [postalShipError, setPostalShipError] = useState('');
  const [countryShipError, setCountryShipError] = useState('');
  const [streetBillError, setStreetBillError] = useState('');
  const [cityBillError, setCityBillError] = useState('');
  const [postalBillError, setPostalBillError] = useState('');
  const [countryBillError, setCountryBillError] = useState('');
  const [birthdayError, setBirthdayError] = useState('');
  const [apartmentShipError, setErrorApartmentShip] = useState('');
  const [apartmentBillError, setErrorApartmentBill] = useState('');
  const [buildingBillError, setErrorBuildingBill] = useState('');
  const [buildingShipError, setErrorBuildingShip] = useState('');
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [modal, setModal] = useState<JSX.Element | undefined>(undefined);

  const [passwordFocus, setPasswordFocus] = useState(false);
  const [successfulMessage, setSuccessfulMessage] = useState(false);

  const [checkmarkLogin, setCheckmarkLogin] = useState(false);
  const [checkmarkPassword, setCheckmarkPassword] = useState(false);
  const [checkmarkFirstname, setCheckmarkFirstname] = useState(false);
  const [checkmarkLastname, setCheckmarkLastname] = useState(false);
  const [checkmarkStreetShip, setCheckmarkStreetShip] = useState(false);
  const [checkmarkCityShip, setCheckmarkCityShip] = useState(false);
  const [checkmarkPostalShip, setCheckmarkPostalShip] = useState(false);
  const [checkmarkCountryShip, setCheckmarkCountryShip] = useState(false);
  const [checkmarkStreetBill, setCheckmarkStreetBill] = useState(false);
  const [checkmarkCityBill, setCheckmarkCityBill] = useState(false);
  const [checkmarkPostalBill, setCheckmarkPostalBill] = useState(false);
  const [checkmarkCountryBill, setCheckmarkCountryBill] = useState(false);
  const [checkmarkBirthday, setCheckmarkBirthday] = useState(false);
  const [checkmarkBuildingBill, setCheckmarkBuildingBill] = useState(false);
  const [checkmarkBuildingShip, setCheckmarkBuildingShip] = useState(false);
  const [checkmarkApartmentBill, setCheckmarkApartmentBill] = useState(false);
  const [checkmarkApartmentShip, setCheckmarkApartmentShip] = useState(false);

  const [checkedShipping, setCheckedShipping] = useState(false);
  const [checkedBilling, setCheckedBilling] = useState(false);
  const passwordErrorTexts = handlePasswordInput(password);
  const passwordErrorElements = Object.keys(passwordErrorTexts).map(
    (key, i) => {
      return (
        <p
          key={`tooltip_${i}`}
          className={`${style.tooltip_text}${i} ${style.tooltip_text}`}
        >
          <img
            className={style.tooltip_error}
            src={passwordErrorTexts[key].isError ? iconError : iconCheckmark}
            alt="Error icon"
          />
          {passwordErrorTexts[key].text}
        </p>
      );
    }
  );
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
  useEffect(() => {
    if (successfulMessage === true) {
      setModal(createModal());
      setTimeout(() => {
        dispatch(setAuthStatus(true));
        localStorage.setItem('isAuth', 'true');
        navigate('/');
      }, 3000);
    }
  }, [dispatch, isAuth, navigate, successfulMessage]);
  return (
    <div className={style.login}>
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
          <Input
            func={(e): void => inputHandler(e, setFistname)}
            type="text"
            clue={fistnameError ? fistnameError : 'This is required field'}
            placeholder="First name *"
            classWrapper={style.firstname}
            classClue={
              fistnameError
                ? `${style.completed} ${style.error}`
                : style.uncompleted
            }
            classInput={style.firstname_input}
            childrenBefore={
              <div
                className={
                  checkmarkFirstname
                    ? `${style.wrapper_img} ${style.completed}`
                    : `${style.wrapper_img} ${style.uncompleted}`
                }
              >
                <img
                  className={style.wrapper_img_icon}
                  src={iconCheckmark}
                  alt="Icon"
                />
              </div>
            }
          />
          <Input
            func={(e): void => inputHandler(e, setLastname)}
            type="text"
            clue={lastnameError ? lastnameError : 'This is required field'}
            placeholder="Last name *"
            classWrapper={style.lastname}
            classClue={
              lastnameError
                ? `${style.completed} ${style.error}`
                : style.uncompleted
            }
            classInput={style.lastname_input}
            childrenBefore={
              <div
                className={
                  checkmarkLastname
                    ? `${style.wrapper_img} ${style.completed}`
                    : `${style.wrapper_img} ${style.uncompleted}`
                }
              >
                <img
                  className={style.wrapper_img_icon}
                  src={iconCheckmark}
                  alt="Icon"
                />
              </div>
            }
          />
          <Input
            func={(e): void => inputHandler(e, setLogin)}
            type="email"
            clue={loginError ? loginError : 'This is required field'}
            placeholder="E-mail *"
            classWrapper={style.email}
            classClue={
              loginError
                ? `${style.completed} ${style.error}`
                : style.uncompleted
            }
            classInput={style.email_input}
            childrenBefore={
              <div
                className={
                  checkmarkLogin
                    ? `${style.wrapper_img} ${style.completed}`
                    : `${style.wrapper_img} ${style.uncompleted}`
                }
              >
                <img
                  className={style.wrapper_img_icon}
                  src={iconCheckmark}
                  alt="Icon"
                />
              </div>
            }
          />
          <InputPassword
            onblur={(): void => hideTooltip(setPasswordFocus)}
            onfocus={(): void => showTooltip(setPasswordFocus)}
            func={(e): void => inputHandler(e, setPassword)}
            clue={
              passwordError
                ? 'Please enter valid password'
                : 'Password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number'
            }
            tooltip={
              <div
                className={
                  passwordFocus
                    ? `${style.visible} ${style.password_tooltip}`
                    : `${style.hide} ${style.password_tooltip}`
                }
              >
                {passwordErrorElements}
              </div>
            }
            classWrapper={style.password}
            classClue={
              passwordFocus
                ? `${style.password_clue} ${style.hide}`
                : passwordError
                ? `${style.password_clue} ${style.visible} ${style.error}`
                : `${style.password_clue}`
            }
            classInput={style.password_input}
          />
          <InputBirthDateMask
            func={(e): void => inputHandler(e, setBirthday)}
            clue={
              birthdayError
                ? birthdayError
                : `Enter Date of birth in format DD.MM.YYYY. Your age should be equal or more than 13 to register`
            }
            type="text"
            placeholder="dd.mm.yyyy *"
            classWrapper={style.birth}
            classClue={
              birthdayError
                ? `${style.completed} ${style.error}`
                : style.uncompleted
            }
            classInput={style.birth_input}
            childrenBefore={
              <div
                className={
                  checkmarkBirthday
                    ? `${style.wrapper_img} ${style.completed}`
                    : `${style.wrapper_img} ${style.uncompleted}`
                }
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
            <div className={style.address}>
              <h4 className={style.address_title}>Shipping address</h4>
              <input
                onChange={(e): void => handleCheckbox(e, setCheckedShipping)}
                className={style.address_input}
                id="default-shipping"
                name="address"
                type="checkbox"
              />
              <label htmlFor="default-shipping" className={style.address_label}>
                Set like default shipping address
              </label>
            </div>
            <Input
              func={(e): void => inputHandler(e, setStreetShip)}
              type="text"
              clue={
                streetShipError ? streetShipError : 'This is required field'
              }
              placeholder="Street *"
              classWrapper={style.street}
              classClue={
                streetShipError
                  ? `${style.completed} ${style.error}`
                  : style.uncompleted
              }
              classInput={style.street_input}
              childrenBefore={
                <div
                  className={
                    checkmarkStreetShip
                      ? `${style.wrapper_img} ${style.completed}`
                      : `${style.wrapper_img} ${style.uncompleted}`
                  }
                >
                  <img
                    className={style.wrapper_img_icon}
                    src={iconCheckmark}
                    alt="Icon"
                  />
                </div>
              }
            />
            <Input
              func={(e): void => inputHandler(e, setBuildingShip)}
              type="text"
              placeholder="Building *"
              classWrapper={style.building}
              classClue={
                buildingShipError
                  ? `${style.completed} ${style.error}`
                  : style.uncompleted
              }
              classInput={style.building_input}
              clue={
                buildingShipError ? buildingShipError : 'This is required field'
              }
              childrenBefore={
                <div
                  className={
                    checkmarkBuildingShip
                      ? `${style.wrapper_img} ${style.completed}`
                      : `${style.wrapper_img} ${style.uncompleted}`
                  }
                >
                  <img
                    className={style.wrapper_img_icon}
                    src={iconCheckmark}
                    alt="Icon"
                  />
                </div>
              }
            />
            <Input
              func={(e): void => inputHandler(e, setApartmentShip)}
              type="text"
              placeholder="Apartment"
              classWrapper={style.apartment}
              classClue={
                apartmentShipError
                  ? `${style.completed} ${style.error}`
                  : style.uncompleted
              }
              classInput={style.apartment_input}
              clue={
                apartmentShipError
                  ? apartmentShipError
                  : 'This is required field'
              }
              childrenBefore={
                <div
                  className={
                    checkmarkApartmentShip
                      ? `${style.wrapper_img} ${style.completed}`
                      : `${style.wrapper_img} ${style.uncompleted}`
                  }
                >
                  <img
                    className={style.wrapper_img_icon}
                    src={iconCheckmark}
                    alt="Icon"
                  />
                </div>
              }
            />
            <Input
              func={(e): void => inputHandler(e, setCityShip)}
              type="text"
              clue={cityShipError ? cityShipError : 'This is required field'}
              placeholder="City *"
              classWrapper={style.city}
              classClue={
                cityShipError
                  ? `${style.completed} ${style.error}`
                  : style.uncompleted
              }
              classInput={style.city_input}
              childrenBefore={
                <div
                  className={
                    checkmarkCityShip
                      ? `${style.wrapper_img} ${style.completed}`
                      : `${style.wrapper_img} ${style.uncompleted}`
                  }
                >
                  <img
                    className={style.wrapper_img_icon}
                    src={iconCheckmark}
                    alt="Icon"
                  />
                </div>
              }
            />
            <Input
              func={(e): void => inputHandler(e, setPostalShip)}
              type="text"
              clue={
                postalShipError ? postalShipError : 'This is required field'
              }
              placeholder="Postal *"
              classWrapper={style.postal}
              classClue={
                postalShipError
                  ? `${style.completed} ${style.error}`
                  : style.uncompleted
              }
              classInput={style.postal_input}
              childrenBefore={
                <div
                  className={
                    checkmarkPostalShip
                      ? `${style.wrapper_img} ${style.completed}`
                      : `${style.wrapper_img} ${style.uncompleted}`
                  }
                >
                  <img
                    className={style.wrapper_img_icon}
                    src={iconCheckmark}
                    alt="Icon"
                  />
                </div>
              }
            />
            <div className={style.country}>
              <div className={style.country_wrapper}>
                <select
                  onChange={(e): void => selectHandler(e, setCountryShip)}
                  className={
                    checkmarkCountryShip
                      ? `${style.country_select} ${style.approved}`
                      : style.country_select
                  }
                >
                  <option value="" className={style.country_head}>
                    Please, select the country
                  </option>
                  <option value="usa">USA</option>
                  <option value="canada">Canada</option>
                </select>
              </div>
              <div
                className={
                  countryShipError
                    ? `${style.completed} ${style.error}`
                    : style.uncompleted
                }
              >
                {countryShipError ? countryShipError : 'This is required field'}
              </div>
            </div>

            <input
              onChange={(e): void => handleCheckbox(e, setCheckedInput)}
              className={style.checkbox_input}
              id="address"
              name="address"
              type="checkbox"
            />
            <label htmlFor="address" className={style.checkbox}>
              Click here if the shipping and billing addresses are different
            </label>
          </div>

          <div
            className={
              checkedInput
                ? `${style.visible} ${style.billing}`
                : `${style.hide} ${style.billing}`
            }
          >
            <div className={style.address}>
              <h4 className={style.address_title}>Billing address</h4>
              <input
                onChange={(e): void => handleCheckbox(e, setCheckedBilling)}
                className={style.address_input}
                id="default-billing"
                name="address"
                type="checkbox"
              />
              <label htmlFor="default-billing" className={style.address_label}>
                Set like default billing address
              </label>
            </div>
            <Input
              func={(e): void => inputHandler(e, setStreetBill)}
              type="text"
              placeholder="Street *"
              classWrapper={style.street}
              classClue={
                streetBillError
                  ? `${style.completed} ${style.error}`
                  : style.uncompleted
              }
              classInput={style.street_input}
              clue={
                streetBillError ? streetBillError : 'This is required field'
              }
              childrenBefore={
                <div
                  className={
                    checkmarkStreetBill
                      ? `${style.wrapper_img} ${style.completed}`
                      : `${style.wrapper_img} ${style.uncompleted}`
                  }
                >
                  <img
                    className={style.wrapper_img_icon}
                    src={iconCheckmark}
                    alt="Icon"
                  />
                </div>
              }
            />
            <Input
              func={(e): void => inputHandler(e, setBuildingBill)}
              type="text"
              placeholder="Building *"
              classWrapper={style.building}
              classClue={
                buildingBillError
                  ? `${style.completed} ${style.error}`
                  : style.uncompleted
              }
              classInput={style.building_input}
              clue={
                buildingBillError ? buildingBillError : 'This is required field'
              }
              childrenBefore={
                <div
                  className={
                    checkmarkBuildingBill
                      ? `${style.wrapper_img} ${style.completed}`
                      : `${style.wrapper_img} ${style.uncompleted}`
                  }
                >
                  <img
                    className={style.wrapper_img_icon}
                    src={iconCheckmark}
                    alt="Icon"
                  />
                </div>
              }
            />
            <Input
              func={(e): void => inputHandler(e, setApartmentBill)}
              type="text"
              placeholder="Apartment"
              classWrapper={style.apartment}
              classClue={
                apartmentBillError
                  ? `${style.completed} ${style.error}`
                  : style.uncompleted
              }
              classInput={style.apartment_input}
              clue={
                apartmentBillError
                  ? apartmentBillError
                  : 'This is required field'
              }
              childrenBefore={
                <div
                  className={
                    checkmarkApartmentBill
                      ? `${style.wrapper_img} ${style.completed}`
                      : `${style.wrapper_img} ${style.uncompleted}`
                  }
                >
                  <img
                    className={style.wrapper_img_icon}
                    src={iconCheckmark}
                    alt="Icon"
                  />
                </div>
              }
            />
            <Input
              func={(e): void => inputHandler(e, setCityBill)}
              type="text"
              placeholder="City *"
              classWrapper={style.city}
              classClue={
                cityBillError
                  ? `${style.completed} ${style.error}`
                  : style.uncompleted
              }
              classInput={style.city_input}
              clue={cityBillError ? cityBillError : 'This is required field'}
              childrenBefore={
                <div
                  className={
                    checkmarkCityBill
                      ? `${style.wrapper_img} ${style.completed}`
                      : `${style.wrapper_img} ${style.uncompleted}`
                  }
                >
                  <img
                    className={style.wrapper_img_icon}
                    src={iconCheckmark}
                    alt="Icon"
                  />
                </div>
              }
            />
            <Input
              func={(e): void => inputHandler(e, setPostalBill)}
              type="text"
              placeholder="Postal *"
              classWrapper={style.postal}
              classClue={
                postalBillError
                  ? `${style.completed} ${style.error}`
                  : style.uncompleted
              }
              classInput={style.postal_input}
              clue={
                postalBillError ? postalBillError : 'This is required field'
              }
              childrenBefore={
                <div
                  className={
                    checkmarkPostalBill
                      ? `${style.wrapper_img} ${style.completed}`
                      : `${style.wrapper_img} ${style.uncompleted}`
                  }
                >
                  <img
                    className={style.wrapper_img_icon}
                    src={iconCheckmark}
                    alt="Icon"
                  />
                </div>
              }
            />
            <div className={style.country}>
              <div className={style.country_wrapper}>
                <select
                  onChange={(e): void => selectHandler(e, setCountryBill)}
                  className={
                    checkmarkCountryBill
                      ? `${style.country_select} ${style.approved}`
                      : style.country_select
                  }
                >
                  <option value="" className={style.country_head}>
                    Please, select the country
                  </option>
                  <option value="usa">USA</option>
                  <option value="canada">Canada</option>
                </select>
              </div>
              <div
                className={
                  countryBillError
                    ? `${style.completed} ${style.error}`
                    : style.uncompleted
                }
              >
                {countryBillError ? countryBillError : 'This is required field'}
              </div>
            </div>
          </div>

          <ButtonForm
            onClick={(event): void =>
              handleСreationReg(
                event,
                setLoginError,
                setPasswordError,
                setFistnameError,
                setLastnameError,
                setStreetShipError,
                setCityShipError,
                setPostalShipError,
                setCountryShipError,
                setStreetBillError,
                setCityBillError,
                setPostalBillError,
                setCountryBillError,
                setBirthdayError,
                setErrorApartmentBill,
                setErrorBuildingBill,
                setErrorApartmentShip,
                setErrorBuildingShip,
                login,
                password,
                fistname,
                lastname,
                streetShip,
                cityShip,
                postalShip,
                countryShip,
                streetBill,
                cityBill,
                postalBill,
                countryBill,
                birthday,
                apartmentBill,
                buildingBill,
                apartmentShip,
                buildingShip,
                navigate,
                dispatch,
                setCheckmarkLogin,
                setCheckmarkPassword,
                setCheckmarkFirstname,
                setCheckmarkLastname,
                setCheckmarkStreetShip,
                setCheckmarkCityShip,
                setCheckmarkPostalShip,
                setCheckmarkCountryShip,
                setCheckmarkStreetBill,
                setCheckmarkCityBill,
                setCheckmarkPostalBill,
                setCheckmarkCountryBill,
                setCheckmarkBirthday,
                setCheckmarkApartmentBill,
                setCheckmarkBuildingBill,
                setCheckmarkApartmentShip,
                setCheckmarkBuildingShip,
                checkedInput,
                setInvalidCredentials,
                checkedShipping,
                checkedBilling,
                setSuccessfulMessage
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
    </div>
  );
}
export default RegistrationPage;
