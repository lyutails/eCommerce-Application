import Input from '../../components/Input/Input';
import Button from '../../components/shared/Button/Button';
import style from '../Auth/_auth.module.scss';

import iconEmail from '../../../public/assets/icon/email.svg';
import iconPassword from '../../../public/assets/icon/password.svg';
import iconEye from '../../../public/assets/icon/eye.svg';

const clue = {
  invalidEmail: 'Please enter a valid email address (for example: name@example.com)',
  shortPassword: 'Password must be at least 8 characters long',
  uppercasePassword: 'Password must contain at least one uppercase letter (A-Z)',
  lowercasePassword: 'Password must contain at least one lowercase letter (a-z)',
  digitPassword: 'Password must contain at least one digit (0-9)',
  specialPassword: 'Password must contain at least one special character (e.g., !@#$%^&*)',
  requiredField: 'Required field.',
};

function AuthPage(): JSX.Element {
  return (
    <div className={style.login}>
      <div className={style.authorization}>
        <h2 className={style.title}>Login</h2>
        <form action="" className={style.form}>
          <Input type="email" placeholder="E-mail" imageBefore={iconEmail} />
          <Input type="password" placeholder="Password" imageBefore={iconPassword}>
            <div className={style.password_eye}>
              <img className={style.label_img_icon} src={iconEye} alt="Icon" />
            </div>
          </Input>
          <Button classNames={style.button_login} type="submit">
            Log In
          </Button>
        </form>
      </div>
      <div className={style.registration}>
        <h2 className={style.title}>Registartion</h2>
        <Button classNames={style.button_registration}>Sign Up</Button>
      </div>
    </div>
  );
}

export default AuthPage;
