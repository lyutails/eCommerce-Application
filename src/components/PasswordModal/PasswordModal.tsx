import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputPassword from '../Input/inputPassword';
import style from '../PasswordModal/_passwordModal.module.scss';
import ButtonForm from '../shared/ButtonForm/Button';
import CloseIcon from '../../../public/assets/icons/close.svg';
import { handleUpdatePassword } from './password-modal-verify';
import { IProfileState } from '../../types/interfaces';
import { handlePasswordInput, inputHandler } from '../../pages/verification';
import { checkPasswordError } from '../../pages/verificationTwo';
import InputPasswordTwo from '../Input/inputPasswordTwo';
import { changePassword } from '../../store/reducers/profileReducer';

export interface IPasswordModalProps {
  modalClass: string;
  token: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  setClickedPasswordUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IPasswordUpdateData {
  currentError: boolean;
  newError: boolean;
  repeateError: boolean;
  token: string;
  passwordNewField: string;
  passwordRepeatField: string;
}

function PasswordModal(props: IPasswordModalProps): JSX.Element {
  const dispatch = useDispatch();
  const { version, password } = useSelector(
    (state: IProfileState) => state.profile
  );
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [passwordNew, setPasswordNew] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [token, setToken] = useState('');
  const [checkmarkPasswordCurrent, setCheckmarkPasswordCurrent] =
    useState(false);
  const [checkmarkPasswordNew, setCheckmarkPasswordNew] = useState(false);
  const [checkmarkPasswordRepeat, setCheckmarkPasswordRepeat] = useState(false);

  useEffect(() => {
    setToken(props.token);
  }, [props.token]);

  const customerUpdateData = {
    version: version,
    currentPassword: passwordCurrent,
    newPassword: passwordNew,
  };
  const passwordUpdateData: IPasswordUpdateData = {
    currentError: checkmarkPasswordCurrent,
    newError: checkmarkPasswordNew,
    repeateError: checkmarkPasswordRepeat,
    token: token,
    passwordNewField: passwordNew,
    passwordRepeatField: passwordRepeat,
  };
  function checkInputError(
    passwordField: string,
    setCheckmarkPassword: React.Dispatch<React.SetStateAction<boolean>>
  ): void {
    const passwordErrors = handlePasswordInput(passwordField);
    const error = Object.keys(passwordErrors).map((key): boolean => {
      if (passwordErrors[key].isError === true) {
        return true;
      }
      return false;
    });
    if (error.includes(true)) {
      setCheckmarkPassword(false);
    } else {
      setCheckmarkPassword(true);
    }
  }
  const setInputAction = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    checkErrorInput: (passwordField: string) => boolean
  ): void => {
    const errorMessage = checkErrorInput(event.target.value);
    dispatch(
      changePassword({
        [fieldName]: {
          value: event.target.value,
          error: errorMessage,
          isChecked: !errorMessage,
        },
      })
    );
  };
  return (
    <div className={`${style.modal} ${props.modalClass}`}>
      <ButtonForm classNames={style.modal_close} onClick={props.onClick}>
        <img src={CloseIcon} alt="Close Modal" />
      </ButtonForm>
      <div className={style.modal_password}>
        <h4 className={style.modal_title}>Password</h4>
        {/* <InputPassword
          onChange={(e): void => {
            inputHandler(e, setPasswordCurrent);
            checkInputError(e.target.value, setCheckmarkPasswordCurrent);
          }}
          tooltipColor={style.tooltip_color}
          clueError={style.password_error}
          clueColor={style.modal_color}
          placeholder="Password *"
          passwordError={checkmarkPasswordCurrent}
          passwordField={passwordCurrent}
        /> */}
        <InputPasswordTwo
          onChange={(e): void =>
            setInputAction(e, 'currentPassword', checkPasswordError)
          }
          checkmarkPassword={password.currentPassword.isChecked}
          passwordError={password.currentPassword.error}
          passwordField={'currentPassword'}
          tooltipColor={style.tooltip_color}
          clueError={style.password_error}
          clueColor={style.modal_color}
          placeholder="Password *"
        />
        <h4 className={style.modal_title}>New password</h4>
        <InputPassword
          onChange={(e): void => {
            inputHandler(e, setPasswordNew);
            checkInputError(e.target.value, setCheckmarkPasswordNew);
          }}
          tooltipColor={style.tooltip_color}
          clueError={style.password_error}
          clueColor={style.password_new_color}
          placeholder="New password *"
          passwordError={checkmarkPasswordNew}
          passwordField={passwordNew}
        />
        <h4 className={style.modal_title}>Confirm password</h4>
        <InputPassword
          onChange={(e): void => {
            inputHandler(e, setPasswordRepeat);
            checkInputError(e.target.value, setCheckmarkPasswordRepeat);
          }}
          tooltipColor={style.tooltip_color}
          clueError={style.password_error}
          clueColor={style.modal_color}
          placeholder="Confirm password *"
          passwordError={checkmarkPasswordRepeat}
          passwordField={passwordRepeat}
        />
      </div>
      <ButtonForm
        onClick={(): void => {
          handleUpdatePassword(
            passwordUpdateData,
            customerUpdateData,
            props.setClickedPasswordUpdate,
            props.setShowModal
          );
        }}
        classNames={style.modal_button}
      >
        Confirm
      </ButtonForm>
    </div>
  );
}

export default PasswordModal;
