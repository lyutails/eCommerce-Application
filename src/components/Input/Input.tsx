import style from '../Input/_input.module.scss';
import { ReactNode } from 'react';
// import { clue } from '../Input/input-data';

interface InputProps {
  type: string;
  classInput: string;
  classClue: string;
  classWrapper: string;
  placeholder: string;
  imageBefore: string;
  imageAfter?: string;
  children?: ReactNode;
}

function Input(props: InputProps): JSX.Element {
  return (
    <div className={`${style.wrapper} ${props.classWrapper}`}>
      <div className={style.wrapper_label}>
        <div className={style.wrapper_img}>
          <img
            className={style.wrapper_img_icon}
            src={props.imageBefore}
            alt="Icon"
          />
        </div>
        <input
          className={`${style.wrapper_input} ${props.classInput}`}
          type={props.type}
          placeholder={props.placeholder}
          required
        />
        {props.children}
      </div>
      <span className={`${style.wrapper_clue} ${props.classClue}`}>
        Please enter a valid email address (for example: name@example.com)
      </span>
    </div>
  );
}

export default Input;
