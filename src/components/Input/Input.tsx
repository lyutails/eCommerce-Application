import style from '../Input/_input.module.scss';
import { ChangeEventHandler, ReactNode } from 'react';

// import { clue } from '../Input/input-data';

interface IInputProps {
  type: string;
  classInput: string;
  classClue: string;
  classWrapper: string;
  placeholder: string;
  childrenBefore?: ReactNode;
  childrenAfter?: ReactNode;
  func?: ChangeEventHandler<HTMLInputElement>;
}

function Input(props: IInputProps): JSX.Element {
  return (
    <div className={`${style.wrapper} ${props.classWrapper}`}>
      <div className={style.wrapper_label}>
        {props.childrenBefore}
        <input
          onChange={props.func}
          className={`${style.wrapper_input} ${props.classInput}`}
          type={props.type}
          placeholder={props.placeholder}
          required
        />
        {props.childrenAfter}
      </div>
      <span className={`${style.wrapper_clue} ${props.classClue}`}>
        Please enter a valid email address (for example: name@example.com)
      </span>
    </div>
  );
}

export default Input;
