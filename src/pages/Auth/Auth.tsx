import Input from '../../components/Input/Input';
import style from '../Auth/_auth.module.scss';
import ButtonForm from '../../components/shared/ButtonForm/Button';
import iconEmail from '../../../public/assets/icon/email.svg';
import iconPassword from '../../../public/assets/icon/password.svg';
import iconEye from '../../../public/assets/icon/eye.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthStatus } from '../../store/reducers/userReducer';
// import { checkEmail } from '../Auth/verify';
// import { ChangeEventHandler } from 'react';

const clue = {
  invalidEmail:
    'Please enter a valid email address (for example: name@example.com)',
  shortPassword: 'Password must be at least 8 characters long',
  uppercasePassword:
    'Password must contain at least one uppercase letter (A-Z)',
  lowercasePassword:
    'Password must contain at least one lowercase letter (a-z)',
  digitPassword: 'Password must contain at least one digit (0-9)',
  specialPassword:
    'Password must contain at least one special character (e.g., !@#$%^&*)',
  requiredField: 'Required field.',
};

function AuthPage(): JSX.Element {
  // const isAuth = useSelector((state: IRootState) => state.user.isAuth);
  // для навигации
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleСreationAuth = (e: Event): void => {
    console.log(e);
  };
  const handleToLogin = (): void => {
    dispatch(setAuthStatus(true));
    navigate('/registration');
  };
  return (
    <div className={style.login}>
      <div className={style.login_wrapper}>
        <div className={style.authorization}>
          <h2 className={style.title}>Login</h2>
          <form action="" className={style.authorization_form}>
            <Input
              // func={(event: ChangeEventHandler<HTMLInputElement>): void =>
              //   checkEmail(event)
              // }
              type="email"
              placeholder="E-mail"
              classWrapper={style.email}
              classClue={style.email_clue}
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
              type="password"
              placeholder="Password"
              classWrapper={style.password}
              classClue={style.password_clue}
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
                <ButtonForm classNames={style.password_eye}>
                  <img
                    className={style.label_img_icon}
                    src={iconEye}
                    alt="Icon"
                  />
                </ButtonForm>
              }
            />
            <ButtonForm classNames={style.authorization_button} type="submit">
              LogIn
            </ButtonForm>
          </form>
        </div>
        <div className={style.registration}>
          <h2 className={style.title}>Registartion</h2>
          <ButtonForm
            handlerLogin={handleToLogin}
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

// const dispatch = useDispatch();
// const [login, setLogin] = useState('');
// const [password, setPassword] = useState('');
// //состояние ошибки
// const [loginError, setLoginError] = useState('');
// const [passwordError, setPasswordError] = useState('');
// //для навигации
// // const navigate = useNavigate();
// // для проверки состояний
// let loginСheck = false;
// let passwordСheck = false;

// // чтобы значения из инпута попадали в логин и пароль
// const loginHandler = (e: ChangeEvent<HTMLInputElement>): void => {
//   setLogin((e.target as HTMLInputElement).value);
// };

// const passwordHandler = (e: ChangeEvent<HTMLInputElement>): void => {
//   setPassword((e.target as HTMLInputElement).value);
// };

// const handeleСreationReg = (
//   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
// ): void => {
//   e.preventDefault();
//   //валидация для логина
//   if (login === '') {
//     setLoginError('Поле не должно быть пустым');
//     loginСheck = false;
//   } else if (login.length < 4) {
//     setLoginError('Логин должен содержать не менее 4-х символов');
//     loginСheck = false;
//   } else {
//     setLoginError('');
//     loginСheck = true;
//   }
//   //валидация для пароля
//   if (password === '') {
//     setPasswordError('Поле не должно быть пустым');
//     passwordСheck = false;
//   } else if (password.length < 4) {
//     setPasswordError('Логин должен содержать не менее 4-х символов');
//     passwordСheck = false;
//   } else {
//     setPasswordError('');
//     passwordСheck = true;
//   }
//   console.log(loginСheck, passwordСheck);
//   console.log(login, password);
//   // проверка общего состояния и если все хорошо переход на Вход
//   if (loginСheck === true && passwordСheck === true) {
//     dispatch(setAuthStatus(true));
//     navigate('/');
//   }
// };
// return (
//   <div>
//     <form action="">
//       <input type="email" onChange={(event): void => loginHandler(event)} />
//       <span className={style.red}>{loginError}</span>
//       <input
//         type="password"
//         onChange={(event): void => passwordHandler(event)}
//       />
//       <span className={style.red}>{passwordError}</span>
//       <button onClick={(event): void => handeleСreationReg(event)}>
//         Click
//       </button>
//     </form>
//   </div>
// );

// //  {
// //   login,
// //   password,
// // }
