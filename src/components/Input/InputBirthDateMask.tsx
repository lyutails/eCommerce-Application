import { IMaskInput } from 'react-imask';
import style from '../Input/_input.module.scss';
import { useRef } from 'react';
import { getMinUserAge } from './getMinUserAge';
import { IInputPropsMask } from '../../types/interfaces';

function InputBirthDateMask(props: IInputPropsMask): JSX.Element {
  const ref = useRef(null);
  const inputRef = useRef(null);
  return (
    <div className={`${style.wrapper} ${props.classWrapper}`}>
      <div className={style.wrapper_label}>
        {props.childrenBefore}
        <IMaskInput
          onAccept={props.onAccept}
          // onChange={props.func}
          className={`${style.wrapper_input} ${props.classInput}`}
          mask={Date}
          radix="."
          unmask={true}
          ref={ref}
          inputRef={inputRef}
          placeholder={props.placeholder}
          type={props.type}
          max={getMinUserAge()}
          value={props.value}
        />
        {props.childrenAfter}
      </div>
      {props.tooltip}
      <p className={`${style.wrapper_clue} ${props.classClue}`}>{props.clue}</p>
    </div>
  );
}

export default InputBirthDateMask;
