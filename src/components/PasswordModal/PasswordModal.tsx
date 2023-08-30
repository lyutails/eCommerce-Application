import { ChangeEventHandler, ReactNode, useState } from 'react';
import InputPassword from '../Input/inputPassword';
import style from '../PasswordModal/_passwordModal.module.scss';
import ButtonForm from '../shared/ButtonForm/Button';
import CloseIcon from '../../../public/assets/icons/close.svg';
import { handleUpdatePassword } from './password-modal-verify';

export interface IPasswordModalProps {
  version: number;
  modalClass: string;
  token: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  setClickedPasswordUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function PasswordModal(props: IPasswordModalProps): JSX.Element {
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [passwordNew, setPasswordNew] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [passwordCurrentСheck, setPasswordCurrentСheck] = useState(false);
  const [passwordNewСheck, setPasswordNewСheck] = useState(false);
  const [passwordRepeatСheck, setPasswordRepeatСheck] = useState(false);
  const [checkmarkPasswordCurrent, setCheckmarkPasswordCurrent] =
    useState(false);
  const [checkmarkPasswordNew, setCheckmarkPasswordNew] = useState(false);
  const [checkmarkPasswordRepeat, setCheckmarkPasswordRepeat] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const customerUpdateData = {
    version: props.version,
    currentPassword: passwordCurrent,
    newPassword: passwordNew,
  };
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
          setPasswordField={setPasswordCurrent}
          passwordField={passwordCurrent}
          setPasswordCheck={setPasswordCurrentСheck}
          checkmarkPassword={checkmarkPasswordCurrent}
          setCheckmarkPassword={setCheckmarkPasswordCurrent}
        />
        <h4 className={style.modal_title}>New password</h4>
        <InputPassword
          tooltipColor={style.tooltip_color}
          clueError={style.password_error}
          clueColor={style.password_new_color}
          placeholder="New password *"
          passwordError={passwordError}
          setPasswordField={setPasswordNew}
          passwordField={passwordNew}
          setPasswordCheck={setPasswordNewСheck}
          checkmarkPassword={checkmarkPasswordNew}
          setCheckmarkPassword={setCheckmarkPasswordNew}
        />
        <h4 className={style.modal_title}>Confirm password</h4>
        <InputPassword
          tooltipColor={style.tooltip_color}
          clueError={style.password_error}
          clueColor={style.modal_color}
          placeholder="Confirm password *"
          passwordError={passwordError}
          setPasswordField={setPasswordRepeat}
          passwordField={passwordRepeat}
          setPasswordCheck={setPasswordRepeatСheck}
          checkmarkPassword={checkmarkPasswordRepeat}
          setCheckmarkPassword={setCheckmarkPasswordRepeat}
        />
      </div>
      <ButtonForm
        onClick={(): void =>
          handleUpdatePassword(
            passwordCurrentСheck,
            passwordNewСheck,
            passwordRepeatСheck,
            props.token ? props.token : '',
            customerUpdateData,
            props.setClickedPasswordUpdate,
            props.setShowModal,
            passwordNew,
            passwordRepeat
          )
        }
        classNames={style.modal_button}
      >
        Confirm
      </ButtonForm>
    </div>
  );
}

export default PasswordModal;
