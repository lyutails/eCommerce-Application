import Input from '../../components/Input/Input';
import style from '../Auth/_auth.module.scss';
import ButtonForm from '../../components/shared/ButtonForm/Button';
import iconEmail from '../../../public/assets/icons/email.svg';
import iconPassword from '../../../public/assets/icons/password.svg';
import iconEye from '../../../public/assets/icons/eye.svg';
// import iconError from '../../../public/assets/icon/error.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthStatus } from '../../store/reducers/userReducer';
import { handleСreationAuth } from './verify-auth';
import { useState } from 'react';
import { showPassword } from '../showPassword';
import { inputHandler } from '../verification';
import { IRootState } from '../../types/interfaces';

function AuthPage(): JSX.Element {
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState({});
  const [checkmarkLogin, setCheckmarkLogin] = useState(false);

  const [passwordFlagError, setPasswordFlagError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerReg = (): void => {
    dispatch(setAuthStatus(false));
    navigate('/registration');
  };
  return (
    <div className={style.login} data-testid="auth-component">
      <div className={style.login_wrapper}>
        <div className={style.authorization}>
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
            <Input
              func={(e): void => inputHandler(e, setPassword)}
              clue={
                typeof passwordError === 'string'
                  ? passwordError
                  : 'Password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number'
              }
              type="password"
              placeholder="Password"
              classWrapper={style.password}
              classClue={
                passwordFlagError
                  ? `${style.password_clue} ${style.password_error}`
                  : `${style.password_clue} ${style.password_valid}`
              }
              classInput={style.password_input}
              childrenBefore={
                <div className={style.wrapper_img}>
                  <img
                    className={style.wrapper_img_icon}
                    src={iconPassword}
                    alt="Icon"
                  />
                </div>
              }
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
            />
            <ButtonForm
              handlerLogin={(event): void =>
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
                  setPasswordFlagError
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
            handlerLogin={handlerReg}
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
