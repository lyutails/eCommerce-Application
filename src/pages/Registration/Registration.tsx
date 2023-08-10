import style from '../Registration/_registration.module.scss';
import ButtonForm from '../../components/shared/ButtonForm/Button';

function RegistrationPage(): JSX.Element {
  return (
    <div className={style.login}>
      <h2 className={style.title}>Registartion</h2>
      <ButtonForm classNames={style.button_registration}>
        Registration
      </ButtonForm>
    </div>
  );
}
export default RegistrationPage;
