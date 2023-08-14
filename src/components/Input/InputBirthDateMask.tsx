import { IMaskInput } from 'react-imask';
import style from '../Input/_input.module.scss';
import { ChangeEventHandler, ReactNode, useRef } from 'react';
import { getMinUserAge } from './getMinUserAge';

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

// "Enter Date of birth in forman dd.mm.yyyy *" - under input

function InputBirthDateMask(props: IInputProps): JSX.Element {
  const ref = useRef(null);
  const inputRef = useRef(null);

  return (
    <div className={`${style.wrapper} ${props.classWrapper}`}>
      <div className={style.wrapper_label}>
        {props.childrenBefore}
        <IMaskInput
          className={`${style.wrapper_input} ${props.classInput}`}
          mask={Date}
          radix="."
          unmask={true}
          ref={ref}
          inputRef={inputRef} // access to nested input
          // DO NOT USE onChange TO HANDLE CHANGES!
          // USE onAccept INSTEAD
          // onAccept={
            // depending on prop above first argument is
            // `value` if `unmask=false`,
            // `unmaskedValue` if `unmask=true`,
            // `typedValue` if `unmask='typed'`
            // (value, mask) => console.log(value)
          // }
          placeholder={props.placeholder}
          type={props.type}
          max={getMinUserAge()}
          required
        />
        {props.childrenAfter}
      </div>
      {props.tooltip}
      <p className={`${style.wrapper_clue} ${props.classClue}`}>{props.clue}</p>
    </div>
  );
}

export default InputBirthDateMask;
