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
  clue?: string;
  tooltip?: ReactNode;
  value?: string;
  max?: string;
}

function Input(props: IInputProps): JSX.Element {
  return (
    <div className={`${style.wrapper} ${props.classWrapper}`}>
      <div className={style.wrapper_label}>
        {props.childrenBefore}
        <input
          value={props.value}
          max={props.max}
          onChange={props.func}
          className={`${style.wrapper_input} ${props.classInput}`}
          type={props.type}
          placeholder={props.placeholder}
          required
        />
        {props.childrenAfter}
      </div>
      {props.tooltip}
      <p className={`${style.wrapper_clue} ${props.classClue}`}>{props.clue}</p>
    </div>
  );
}

export default Input;
