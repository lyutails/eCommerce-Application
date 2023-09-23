import Input from '../../components/Input/Input';
import style from '../Auth/_auth.module.scss';
import ButtonForm from '../../components/shared/ButtonForm/Button';
import iconEmail from '../../../public/assets/icons/email.svg';
import iconError from '../../../public/assets/icons/error.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthStatus } from '../../store/reducers/userReducer';
import { handleСreationAuth } from './verify-auth';
import { useEffect, useState } from 'react';
import { handleLoginInputTwo } from '../verification';
import {
  ICartState,
  IProfileState,
  IRegistrationState,
} from '../../types/interfaces';
import { changeBioReg } from '../../store/reducers/registrationReducer';
import { checkPasswordError } from '../verificationTwo';
import { changePassword } from '../../store/reducers/profileReducer';
import InputPasswordTwo from '../../components/Input/inputPasswordTwo';

export interface ILoginCustomerData {
  email: string;
  password: string;
  anonymousCart: {
    anonymousID: string;
    versionAnonCart: number;
    cartID: string;
    anonymousRefreshToken: string;
    anonymousAccessToken: string;
  };
  loginError: boolean;
  passwordError: boolean;
}

function AuthPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bio } = useSelector(
    (state: IRegistrationState) => state.registration
  );
  const { password } = useSelector((state: IProfileState) => state.profile);
  const { anonymousCart } = useSelector((state: ICartState) => state.cart);
  const [modal, setModal] = useState<JSX.Element | undefined>(undefined);
  const [successfulMessage, setSuccessfulMessage] = useState(false);

  const [invalidCredentials, setInvalidCredentials] = useState(false);

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

  const handlerReg = (): void => {
    dispatch(setAuthStatus(false));
    navigate('/registration');
  };

  useEffect(() => {
    if (successfulMessage === true) {
      setModal(createModal());
      setTimeout(() => {
        dispatch(setAuthStatus(true));
        localStorage.setItem('isAuth', 'true');
      }, 5300);
    }
  }, [dispatch, navigate, successfulMessage]);

  const loginCustomerData: ILoginCustomerData = {
    email: bio.email.value,
    password: password.currentPassword.value,
    anonymousCart: anonymousCart,
    loginError: !bio.email.error,
    passwordError: !password.currentPassword.error,
  };

  const setInputLogin = (
    event: React.ChangeEvent<HTMLInputElement>,
    checkErrorInput: (inputField: string) => string | boolean
  ): void => {
    const errorMessage = checkErrorInput(event.target.value);
    dispatch(
      changeBioReg({
        value: event.target.value,
        error: errorMessage,
        isChecked: !errorMessage,
      })
    );
  };

  const setInputPassword = (
    event: React.ChangeEvent<HTMLInputElement>,
    checkErrorInput: (inputField: string) => string | boolean
  ): void => {
    const errorMessage = checkErrorInput(event.target.value);
    dispatch(
      changePassword({
        currentPassword: {
          value: event.target.value,
          error: errorMessage,
          isChecked: !errorMessage,
        },
      })
    );
  };
  return (
    <div className={style.login} data-testid="auth-component">
      <div className={style.login_wrapper}>
        <div className={style.authorization}>
          <div
            className={
              invalidCredentials
                ? `${style.visible} ${style.invalid}`
                : `${style.hidden} ${style.invalid}`
            }
          >
            <img
              className={style.invalid_error}
              src={iconError}
              alt="Error icon"
            />
            Invalid email or password
          </div>
          <h2 className={style.title}>Login</h2>
          <form action="" className={style.authorization_form}>
            {/* <div className="field label border">
              <input />
              <label>Username</label>
            </div> */}

            <Input
              onChange={(e): void => setInputLogin(e, handleLoginInputTwo)}
              clue={
                bio.email.error ? bio.email.error : 'This is required field'
              }
              type="email"
              placeholder="E-mail"
              classWrapper={style.email}
              classClue={`${style.email_clue} ${
                bio.email.error ? style.error : ''
              }`}
              classInput={style.email_input}
              childrenBefore={
                <div className={style.wrapper_img}>
                  <img
                    className={style.wrapper_img_icon}
                    src={iconEmail}
                    alt="Icon"
                  />
                </div>
              }
            />
            <InputPasswordTwo
              onChange={(e): void => setInputPassword(e, checkPasswordError)}
              checkmarkPassword={password.currentPassword.isChecked}
              passwordError={!!password.currentPassword.error}
              passwordField={'currentPassword'}
              tooltipColor={style.tooltip_color}
              clueError={style.password_error}
              clueColor={style.modal_color}
              placeholder="Password *"
            />
            <ButtonForm
              onClick={(event): void =>
                handleСreationAuth(
                  event,
                  loginCustomerData,
                  dispatch,
                  setInvalidCredentials,
                  anonymousCart,
                  setSuccessfulMessage
                )
              }
              classNames={style.authorization_button}
              type="submit"
            >
              LogIn
            </ButtonForm>
          </form>
        </div>
        <div className={style.registration}>
          <h2 className={style.title}>Registration</h2>
          <ButtonForm
            onClick={handlerReg}
            classNames={style.registration_button}
          >
            SignUp
          </ButtonForm>
        </div>
      </div>
      <div>{modal}</div>
    </div>
  );
}
export default AuthPage;
