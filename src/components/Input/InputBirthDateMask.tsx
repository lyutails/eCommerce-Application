import { IMaskInput } from 'react-imask';
import style from '../Input/_input.module.scss';
import { useRef } from 'react';
import { getMinUserAge } from './getMinUserAge';
import { IInputPropsMask } from '../../types/interfaces';

/* Enter Date of birth in forman dd.mm.yyyy NB! your age should be equal or more than 13 to register * */

function InputBirthDateMask(props: IInputPropsMask): JSX.Element {
  const ref = useRef(null);
  const inputRef = useRef(null);

  return (
    <div className={`${style.wrapper} ${props.classWrapper}`}>
      <div className={style.wrapper_label}>
        {props.childrenBefore}
        <IMaskInput
          onChange={props.func}
          className={`${style.wrapper_input} ${props.classInput}`}
          mask={Date}
          radix="."
          unmask={true}
          ref={ref}
          inputRef={inputRef}
          placeholder={props.placeholder}
          type={props.type}
          max={getMinUserAge()}
          /* required */
        />
        {props.childrenAfter}
      </div>
      {props.tooltip}
      <p className={`${style.wrapper_clue} ${props.classClue}`}>{props.clue}</p>
    </div>
  );
}

export default InputBirthDateMask;
