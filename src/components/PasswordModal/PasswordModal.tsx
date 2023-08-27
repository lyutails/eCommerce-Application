import { ChangeEventHandler, ReactNode, useState } from 'react';
import InputPassword from '../Input/inputPassword';
import style from '../PasswordModal/_passwordModal.module.scss';
import ButtonForm from '../shared/ButtonForm/Button';
import CloseIcon from '../../../public/assets/icons/close.svg';

export interface IPasswordModalProps {
  modalClass: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function PasswordModal(props: IPasswordModalProps): JSX.Element {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  return (
    <div className={`${style.modal} ${props.modalClass}`}>
      <ButtonForm classNames={style.modal_close} onClick={props.onClick}>
        <img src={CloseIcon} alt="Close Modal" />
      </ButtonForm>
      <div className={style.modal_password}>
        <h4 className={style.modal_title}>Password</h4>
        <InputPassword
          tooltipColor={style.tooltip_color}
          clueError={style.password_error}
          clueColor={style.modal_color}
          placeholder="Password *"
          passwordError={passwordError}
          setPasswordField={setPassword}
          passwordField={password}
        />
        <h4 className={style.modal_title}>New password</h4>
        <InputPassword
          tooltipColor={style.tooltip_color}
          clueError={style.password_error}
          clueColor={style.password_new_color}
          placeholder="New password *"
          passwordError={passwordError}
          setPasswordField={setPassword}
          passwordField={password}
        />
        <h4 className={style.modal_title}>Confirm password</h4>
        <InputPassword
          tooltipColor={style.tooltip_color}
          clueError={style.password_error}
          clueColor={style.modal_color}
          placeholder="Confirm password *"
          passwordError={passwordError}
          setPasswordField={setPassword}
          passwordField={password}
        />
      </div>
      <ButtonForm
        onClick={(): void => console.log('gr')}
        classNames={style.modal_button}
      >
        Confirm
      </ButtonForm>
    </div>
  );
}

export default PasswordModal;
