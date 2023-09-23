import style from '../Input/_input.module.scss';
import { useEffect, useState } from 'react';
import ButtonForm from '../shared/ButtonForm/Button';
import iconPassword from '../../../public/assets/icons/password.svg';
import iconEye from '../../../public/assets/icons/eye.svg';
import iconError from '../../../public/assets/icons/error.svg';
import iconCheckmark from '../../../public/assets/icons/checkmark.svg';
import iconEyeClose from '../../../public/assets/icons/eye-close.svg';
import { IInputPropsPassword, IProfileState } from '../../types/interfaces';
import { hideTooltip, showTooltip } from '../../pages/showTooltip';
import { useSelector } from 'react-redux';
import { handlePasswordInputTwo } from '../../pages/verificationTwo';

function InputPasswordTwo(props: IInputPropsPassword): JSX.Element {
  const { password } = useSelector((state: IProfileState) => state.profile);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordField, setPasswordField] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [passwordCheckmark, setPasswordCheckmark] = useState(false);

  const passwordErrorTexts = handlePasswordInputTwo(
    passwordField ? password[passwordField].value : ''
  );
  useEffect(() => {
    setPasswordField(props.passwordField);
    setPlaceholder(props.placeholder);
    setErrorPassword(props.passwordError);
    setPasswordCheckmark(
      props.checkmarkPassword ? props.checkmarkPassword : false
    );
  }, [
    props.checkmarkPassword,
    props.passwordError,
    props.passwordField,
    props.placeholder,
  ]);

  const passwordErrorElements = Object.keys(passwordErrorTexts).map(
    (key, i) => {
      return (
        <p
          key={`tooltip_${i}`}
          className={`${style.tooltip_text} ${props.tooltipColor}`}
        >
          <img
            className={style.tooltip_error}
            src={passwordErrorTexts[key].isError ? iconError : iconCheckmark}
            alt="Error icon"
          />
          {passwordErrorTexts[key].text}
        </p>
      );
    }
  );
  return (
    <div className={style.wrapper}>
      <div className={style.wrapper_label}>
        <div className={style.wrapper_img}>
          <img
            className={style.wrapper_img_icon}
            src={passwordCheckmark ? iconCheckmark : iconPassword}
            alt="Icon"
          />
        </div>
        <input
          onBlur={(): void => {
            hideTooltip(setPasswordFocus);
          }}
          onFocus={(): void => showTooltip(setPasswordFocus)}
          onChange={props.onChange}
          className={style.wrapper_input}
          type={passwordVisible ? 'text' : 'password'}
          placeholder={placeholder}
        />
        {/* <span className={style.wrapper_placeholder}>{placeholder}</span>
        <span
          className={`${style.wrapper_placeholder_line} ${style.wrapper_placeholder_password}`}
        ></span> */}
        <ButtonForm
          onClick={(): void =>
            passwordVisible
              ? setPasswordVisible(false)
              : setPasswordVisible(true)
          }
          classNames={style.password_eye}
        >
          <img
            className={style.label_img_icon}
            src={passwordVisible ? iconEyeClose : iconEye}
            alt="Icon"
          />
        </ButtonForm>
      </div>
      <div
        className={
          passwordFocus
            ? `${style.shown} ${style.password_tooltip}`
            : `${style.unshown} ${style.tooltip}`
        }
      >
        {passwordErrorElements}
      </div>
      <div
        className={
          passwordFocus
            ? `${style.password_clue} ${style.unshown} ${props.clueColor}`
            : errorPassword
            ? `${style.password_clue} ${style.shown} ${props.clueError}`
            : `${style.password_clue} ${props.clueColor}`
        }
      >
        {errorPassword
          ? 'Please enter valid password'
          : 'Password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number'}
      </div>
    </div>
  );
}

export default InputPasswordTwo;
