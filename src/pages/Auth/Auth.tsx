import Input from '../../components/Input/Input';
import style from '../Auth/_auth.module.scss';
import ButtonForm from '../../components/shared/ButtonForm/Button';
import iconEmail from '../../../public/assets/icon/email.svg';
import iconPassword from '../../../public/assets/icon/password.svg';
import iconEye from '../../../public/assets/icon/eye.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
  // для навигации
  const navigate = useNavigate();
  const handeleСreationAuth = (e: Event): void => {
    console.log(e);
    navigate('/registration');
  };

  return (
    <div className={style.login}>
      <div className={style.authorization}>
        <h2 className={style.title}>Login</h2>
        <form action="" className={style.form}>
          <Input type="email" placeholder="E-mail" imageBefore={iconEmail} />
          <Input
            type="password"
            placeholder="Password"
            imageBefore={iconPassword}
          >
            <div className={style.password_eye}>
              <img className={style.label_img_icon} src={iconEye} alt="Icon" />
            </div>
          </Input>
          <ButtonForm classNames={style.button_login} type="submit">
            Log In
          </ButtonForm>
        </form>
      </div>
      <div className={style.registration}>
        <h2 className={style.title}>Registartion</h2>
        <ButtonForm classNames={style.button_registration}>Sign Up</ButtonForm>
      </div>
    </div>
  );
}
export default AuthPage;
