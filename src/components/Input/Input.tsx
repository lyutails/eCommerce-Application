import style from '../Input/_input.module.scss';
import { IInputProps } from '../../types/interfaces';

function Input(props: IInputProps): JSX.Element {
  return (
    <div className={`${style.wrapper} ${props.classWrapper}`}>
      <div className={style.wrapper_label}>
        {props.childrenBefore}
        <input
          onBlur={props.onblur}
          onFocus={props.onfocus}
          value={props.value}
          max={props.max}
          onChange={props.onChange}
          className={`${style.wrapper_input} ${props.classInput}`}
          type={props.type}
          placeholder={props.placeholder}
        />
        {/* <span className={style.wrapper_placeholder}>{props.placeholder}</span>
        <span className={style.wrapper_placeholder_line}></span> */}
        {props.childrenAfter}
      </div>
      {props.tooltip}
      <div className={`${style.wrapper_clue} ${props.classClue}`}>
        {props.clue}
      </div>
    </div>
  );
}

export default Input;
