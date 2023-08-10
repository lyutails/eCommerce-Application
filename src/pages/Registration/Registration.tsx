import style from '../Registration/_registration.module.scss';
import Input from '../../components/Input/Input';
import ButtonForm from '../../components/shared/ButtonForm/Button';
import iconEye from '../../../public/assets/icon/eye.svg';

function RegistrationPage(): JSX.Element {
  return (
    <div className={style.login}>
      <RegistrationPageLogin />
      <RegistrationPageRegister />
    </div>
  );
}

function RegistrationPageLogin(): JSX.Element {
  return (
    <div className={style.authorization}>
      <h2 className={style.title}>Login</h2>
      <ButtonForm classNames={style.authorization_button}>LogIn</ButtonForm>
    </div>
  );
}

function RegistrationPageRegister(): JSX.Element {
  return (
    <div className={style.registration}>
      <h2 className={style.title}>Registartion</h2>
      <form action="" className={style.registration_form}>
        <Input
          type="text"
          placeholder="First name *"
          classWrapper={style.firstname}
          classClue={style.firstname_clue}
          classInput={style.firstname_input}
        />
        <Input
          type="text"
          placeholder="Last name *"
          classWrapper={style.lastname}
          classClue={style.lastname_clue}
          classInput={style.lastname_input}
        />
        <Input
          type="email"
          placeholder="E-mail *"
          classWrapper={style.email}
          classClue={style.email_clue}
          classInput={style.email_input}
        />
        <Input
          type="password"
          placeholder="Password *"
          classWrapper={style.password}
          classClue={style.password_clue}
          classInput={style.password_input}
          childrenAfter={
            <ButtonForm classNames={style.password_eye}>
              <img className={style.label_img_icon} src={iconEye} alt="Icon" />
            </ButtonForm>
          }
        />
        <Input
          type="text"
          placeholder="Shipping address *"
          classWrapper={style.shipping}
          classClue={style.shipping_clue}
          classInput={style.shipping_input}
        />
        <Input
          type="text"
          placeholder="Billing address *"
          classWrapper={style.billing}
          classClue={style.billing_clue}
          classInput={style.billing_input}
        />
        <input
          className={style.checkbox_input}
          id="address"
          name="address"
          type="checkbox"
        />
        <label htmlFor="address" className={style.checkbox}>
          Click here if the shipping and billing address match
        </label>
        <ButtonForm classNames={style.registration_button} type="submit">
          SignUp
        </ButtonForm>
      </form>
    </div>
  );
}
export default RegistrationPage;
