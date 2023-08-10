import Input from '../../components/Input/Input';
import style from '../Auth/_auth.module.scss';
import ButtonForm from '../../components/shared/ButtonForm/Button';
import iconEmail from '../../../public/assets/icon/email.svg';
import iconPassword from '../../../public/assets/icon/password.svg';
import iconEye from '../../../public/assets/icon/eye.svg';

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
  return (
    <div className={style.login}>
      <AuthPageLogin />
      <AuthPageRegister />
    </div>
  );
}

function AuthPageLogin(): JSX.Element {
  return (
    <div className={style.authorization}>
      <h2 className={style.title}>Login</h2>
      <form action="" className={style.authorization_form}>
        <Input
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
              <img className={style.label_img_icon} src={iconEye} alt="Icon" />
            </ButtonForm>
          }
        />
        <ButtonForm classNames={style.authorization_button} type="submit">
          LogIn
        </ButtonForm>
      </form>
    </div>
  );
}

function AuthPageRegister(): JSX.Element {
  return (
    <div className={style.registration}>
      <h2 className={style.title}>Registartion</h2>
      <ButtonForm classNames={style.registration_button}>SignUp</ButtonForm>
    </div>
  );
}
export default AuthPage;
