import style from '../Registration/_registration.module.scss';
import Input from '../../components/Input/Input';
import ButtonForm from '../../components/shared/ButtonForm/Button';
import iconEye from '../../../public/assets/icon/eye.svg';
import { useNavigate } from 'react-router-dom';
import { checkboxHandler, showPassword } from '../listeners';
import { useState } from 'react';
import {
  cityShipHandler,
  countryShipHandler,
  firstnameHandler,
  lastnameHandler,
  loginHandler,
  passwordHandler,
  postalShipHandler,
  streetShipHandler,
} from '../verification';
import { handleСreationReg } from './verify-registration';

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

  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState({});
  const [fistnameError, setFistnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [streetShipError, setStreetShipError] = useState('');
  const [cityShipError, setCityShipError] = useState('');
  const [postalShipError, setPostalShipError] = useState('');
  const [countryShipError, setCountryShipError] = useState('');
  // const tooltipText = passwordErrors.map((text: string, i: number) => (
  //   <p
  //     key={'text_' + i}
  //     className={`${style.tooltip_text}${i} ${style.tooltip_text}`}
  //   >
  //     <img className={style.tooltip_error} src={iconError} alt="Error icon" />
  //     {text}
  //   </p>
  // ));
  return (
    <div className={style.login}>
      <div className={style.authorization}>
        <h2 className={style.title}>Registration</h2>
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
            func={(e): void => firstnameHandler(e, setFistname)}
            type="text"
            clue={fistnameError}
            placeholder="First name *"
            classWrapper={style.firstname}
            classClue={style.firstname_clue}
            classInput={style.firstname_input}
          />
          <Input
            func={(e): void => lastnameHandler(e, setLastname)}
            type="text"
            clue={lastnameError}
            placeholder="Last name *"
            classWrapper={style.lastname}
            classClue={style.lastname_clue}
            classInput={style.lastname_input}
          />
          <Input
            func={(e): void => loginHandler(e, setLogin)}
            type="email"
            clue={loginError}
            placeholder="E-mail *"
            classWrapper={style.email}
            classClue={style.email_clue}
            classInput={style.email_input}
          />
          <Input
            func={(e): void => passwordHandler(e, setPassword)}
            type="password"
            clue={
              'Password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number'
            }
            placeholder="Password *"
            classWrapper={style.password}
            classClue={style.password_clue}
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
            // tooltip={
            //   <div
            //     data-tooltip="Всплывающая подсказка"
            //     className={style.password_tooltip}
            //   >
            //     {tooltipText}
            //   </div>
            // }
          />
          <Input
            type="date"
            placeholder="Date of birth *"
            max={'2010-01-01'}
            value={'2010-01-15'}
            classWrapper={style.birth}
            classClue={style.birth_clue}
            classInput={style.birth_input}
          />
          <h3 className={style.registration_title}>Address</h3>
          <div className={style.shipping}>
            <h4>Shipping address</h4>
            <Input
              func={(e): void => streetShipHandler(e, setStreetShip)}
              type="text"
              clue={streetShipError}
              placeholder="Street *"
              classWrapper={style.street}
              classClue={style.street_clue}
              classInput={style.street_input}
            />
            <Input
              func={(e): void => cityShipHandler(e, setCityShip)}
              type="text"
              clue={cityShipError}
              placeholder="City *"
              classWrapper={style.city}
              classClue={style.city_clue}
              classInput={style.city_input}
            />
            <Input
              func={(e): void => postalShipHandler(e, setPostalShip)}
              type="text"
              clue={postalShipError}
              placeholder="Postal *"
              classWrapper={style.postal}
              classClue={style.postal_clue}
              classInput={style.postal_input}
            />
            <Input
              func={(e): void => countryShipHandler(e, setCountryShip)}
              type="text"
              clue={countryShipError}
              placeholder="Country *"
              classWrapper={style.country}
              classClue={style.country_clue}
              classInput={style.country_input}
            />
            <input
              onChange={(e): void => checkboxHandler(e, setCheckedInput)}
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
                login,
                password,
                fistname,
                lastname,
                streetShip,
                cityShip,
                postalShip,
                countryShip,
                navigate,
                setPasswordError
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
