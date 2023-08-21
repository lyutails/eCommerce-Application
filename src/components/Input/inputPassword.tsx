import style from '../Input/_input.module.scss';
import { useState } from 'react';
import ButtonForm from '../shared/ButtonForm/Button';
import iconPassword from '../../../public/assets/icons/password.svg';
import iconEye from '../../../public/assets/icons/eye.svg';
import iconEyeClose from '../../../public/assets/icons/eye-close.svg';
import { IInputPropsPassword } from '../../types/interfaces';

function InputPassword(props: IInputPropsPassword): JSX.Element {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className={`${style.wrapper} ${props.classWrapper}`}>
      <div className={style.wrapper_label}>
        <div className={style.wrapper_img}>
          <img
            className={style.wrapper_img_icon}
            src={iconPassword}
            alt="Icon"
          />
        </div>
        <input
          onBlur={props.onblur}
          onFocus={props.onfocus}
          value={props.value}
          max={props.max}
          onChange={props.func}
          className={`${style.wrapper_input} ${props.classInput}`}
          type={passwordVisible ? 'text' : 'password'}
          placeholder="Password *"
        />
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
      {props.tooltip}
      <div className={`${style.wrapper_clue} ${props.classClue}`}>
        {props.clue}
      </div>
    </div>
  );
}

export default InputPassword;
