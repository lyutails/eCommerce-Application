import style from '../Registration/_registration.module.scss';
import Input from '../../components/Input/Input';
import ButtonForm from '../../components/shared/ButtonForm/Button';
import iconEye from '../../../public/assets/icons/eye.svg';
import iconError from '../../../public/assets/icons/error.svg';
import iconCheckmark from '../../../public/assets/icons/checkmark.svg';
import { useNavigate } from 'react-router-dom';
import { showPassword } from '../showPassword';
import { ReactNode, useState } from 'react';
import { handlePasswordInput, inputHandler } from '../verification';
import { handleСreationReg } from './verify-registration';
import InputBirthDateMask from '../../components/Input/InputBirthDateMask';
import { handleCheckbox } from '../../utils/handleCheckbox';
import { hideTooltip, showTooltip } from '../showTooltip';

function RegistrationPage(): JSX.Element {
  const navigate = useNavigate();
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
  const [birthday, setBirthday] = useState('');

  const [loginError, setLoginError] = useState('');
  const [fistnameError, setFistnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [streetShipError, setStreetShipError] = useState('');
  const [cityShipError, setCityShipError] = useState('');
  const [postalShipError, setPostalShipError] = useState('');
  const [countryShipError, setCountryShipError] = useState('');
  const [birthdayError, setBirthdayError] = useState('');

  const [passwordFocus, setPasswordFocus] = useState(false);

  const [checkmarkLogin, setCheckmarkLogin] = useState(false);
  const [checkmarkPassword, setCheckmarkPassword] = useState(false);
  const [checkmarkFirstname, setCheckmarkFirstname] = useState(false);
  const [checkmarkLastname, setCheckmarkLastname] = useState(false);
  const [checkmarkStreetShip, setCheckmarkStreetShip] = useState(false);
  const [checkmarkCityShip, setCheckmarkCityShip] = useState(false);
  const [checkmarkPostalShip, setCheckmarkPostalShip] = useState(false);
  const [checkmarkCountryShip, setCheckmarkCountryShip] = useState(false);
  const [checkmarkBirthday, setCheckmarkBirthday] = useState(false);

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
  return (
    <div className={style.login}>
      <div className={style.authorization}>
        <h2 className={style.title}>LogIn</h2>
        <ButtonForm
          handlerLogin={handleToLogin}
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
                ? `${style.firstname_clue} ${style.error}`
                : style.firstname_clue
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
                ? `${style.lastname_clue} ${style.error}`
                : style.lastname_clue
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
                ? `${style.email_clue} ${style.error}`
                : style.email_clue
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
          <Input
            onblur={(): void => hideTooltip(setPasswordFocus)}
            onfocus={(): void => showTooltip(setPasswordFocus)}
            func={(e): void => inputHandler(e, setPassword)}
            type="password"
            clue={
              'Password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number'
            }
            tooltip={
              <div
                className={
                  passwordFocus
                    ? `${style.visible} ${style.password_tooltip}`
                    : `${style.hide} ${style.tooltip}`
                }
              >
                {passwordErrorElements}
              </div>
            }
            placeholder="Password *"
            classWrapper={style.password}
            classClue={
              passwordFocus
                ? `${style.password_clue} ${style.hide}`
                : `${style.password_clue} ${style.visible}`
            }
            classInput={style.password_input}
            childrenAfter={
              <ButtonForm
                handlerLogin={(e): void => showPassword(e)}
                classNames={style.password_eye}
              >
                <img
                  className={style.label_img_icon}
                  src={iconEye}
                  alt="Icon"
                />
              </ButtonForm>
            }
            childrenBefore={
              <div
                className={
                  checkmarkPassword
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
                ? `${style.birth_clue} ${style.error}`
                : style.birth_clue
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
            <h4>Shipping address</h4>
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
                  ? `${style.street_clue} ${style.error}`
                  : style.street_clue
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
              func={(e): void => inputHandler(e, setCityShip)}
              type="text"
              clue={cityShipError ? cityShipError : 'This is required field'}
              placeholder="City *"
              classWrapper={style.city}
              classClue={
                cityShipError
                  ? `${style.city_clue} ${style.error}`
                  : style.city_clue
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
                  ? `${style.postal_clue} ${style.error}`
                  : style.postal_clue
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
            <Input
              func={(e): void => inputHandler(e, setCountryShip)}
              type="text"
              clue={
                countryShipError ? countryShipError : 'This is required field'
              }
              placeholder="Country *"
              classWrapper={style.country}
              classClue={
                countryShipError
                  ? `${style.country_clue} ${style.error}`
                  : style.country_clue
              }
              classInput={style.country_input}
              childrenBefore={
                <div
                  className={
                    checkmarkCountryShip
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
            <h4>Billing address</h4>
            <Input
              type="text"
              placeholder="Street *"
              classWrapper={style.street}
              classClue={style.street_clue}
              classInput={style.street_input}
            />
            <Input
              type="text"
              placeholder="City *"
              classWrapper={style.city}
              classClue={style.city_clue}
              classInput={style.city_input}
            />
            <Input
              type="text"
              placeholder="Postal *"
              classWrapper={style.postal}
              classClue={style.postal_clue}
              classInput={style.postal_input}
            />
            <Input
              type="text"
              placeholder="Country *"
              classWrapper={style.country}
              classClue={style.country_clue}
              classInput={style.country_input}
            />
          </div>
          <ButtonForm
            handlerLogin={(event): void =>
              handleСreationReg(
                event,
                setLoginError,
                setFistnameError,
                setLastnameError,
                setStreetShipError,
                setCityShipError,
                setPostalShipError,
                setCountryShipError,
                setBirthdayError,
                login,
                password,
                fistname,
                lastname,
                streetShip,
                cityShip,
                postalShip,
                countryShip,
                birthday,
                navigate,
                setCheckmarkLogin,
                setCheckmarkPassword,
                setCheckmarkFirstname,
                setCheckmarkLastname,
                setCheckmarkStreetShip,
                setCheckmarkCityShip,
                setCheckmarkPostalShip,
                setCheckmarkCountryShip,
                setCheckmarkBirthday
              )
            }
            classNames={style.registration_button}
            type="submit"
          >
            SignUp
          </ButtonForm>
        </form>
      </div>
    </div>
  );
}
export default RegistrationPage;
