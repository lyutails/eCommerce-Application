import style from '../Input/_input.module.scss';
import { InputCustomFields } from '../../types/interfaces';
import { ReactNode } from 'react';
// import { clue } from '../Input/input-data';

interface InputProps {
  type: string;
  placeholder: string;
  imageBefore: string;
  imageAfter?: string;
  children?: ReactNode;
}

function Input(props: InputProps): JSX.Element {
  return (
    <div className={style.wrapper}>
      <div className={style.wrapper_label}>
        <div className={style.wrapper_img}>
          <img
            className={style.wrapper_img_icon}
            src={props.imageBefore}
            alt="Icon"
          />
        </div>
        <input
          className={style.wrapper_input}
          type={props.type}
          placeholder={props.placeholder}
          required
        />
        {props.children}
      </div>
      <span className={style.wrapper_clue}></span>
    </div>
  );
}

export default Input;
