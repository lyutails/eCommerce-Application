import Input from '../../components/Input/Input';
import style from '../Auth/_auth.module.scss';
import ButtonForm from '../../components/shared/ButtonForm/Button';
import iconEmail from '../../../public/assets/icons/email.svg';
import iconCheckmark from '../../../public/assets/icons/checkmark.svg';
import iconError from '../../../public/assets/icons/error.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthStatus } from '../../store/reducers/userReducer';
import { handleСreationAuth } from './verify-auth';
import { useState } from 'react';
import { handlePasswordInput, inputHandler } from '../verification';
import { IRootState } from '../../types/interfaces';
import InputPassword from '../../components/Input/inputPassword';
import { hideTooltip, showTooltip } from '../showTooltip';

function AuthPage(): JSX.Element {
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState({});
  const [checkmarkLogin, setCheckmarkLogin] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [passwordFlagError, setPasswordFlagError] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerReg = (): void => {
    dispatch(setAuthStatus(false));
    navigate('/registration');
  };
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
            <Input
              func={(e): void => inputHandler(e, setLogin)}
              clue={loginError ? loginError : 'This is required field'}
              type="email"
              placeholder="E-mail"
              classWrapper={style.email}
              classClue={
                loginError
                  ? `${style.email_clue} ${style.error}`
                  : style.email_clue
              }
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
            <InputPassword
              onblur={(): void => hideTooltip(setPasswordFocus)}
              onfocus={(): void => showTooltip(setPasswordFocus)}
              func={(e): void => inputHandler(e, setPassword)}
              clue={
                typeof passwordError === 'string'
                  ? passwordError
                  : 'Password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number'
              }
              classWrapper={style.password}
              classClue={
                passwordFocus
                  ? `${style.password_clue} ${style.unshown}`
                  : passwordFlagError
                  ? `${style.password_clue} ${style.shown} ${style.password_error}`
                  : `${style.password_clue} ${style.password_valid}`
              }
              classInput={style.password_input}
              tooltip={
                <div
                  className={
                    passwordFocus
                      ? `${style.shown} ${style.password_tooltip}`
                      : `${style.unshown} ${style.tooltip}`
                  }
                >
                  {passwordErrorElements}
                </div>
              }
            />
            <ButtonForm
              onClick={(event): void =>
                handleСreationAuth(
                  event,
                  setLoginError,
                  login,
                  password,
                  navigate,
                  setPasswordError,
                  isAuth,
                  dispatch,
                  setCheckmarkLogin,
                  setPasswordFlagError,
                  setInvalidCredentials
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
    </div>
  );
}
export default AuthPage;
