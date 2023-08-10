import style from '../Button/_button.module.scss';
import { ButtonCustomFields } from '../../../types/interfaces';

function Button(props: ButtonCustomFields): JSX.Element {
  return (
    <button className={`${props.classNames} ${style.button}`} type={props.type || 'button'}>
      {props.children}
    </button>
  );
}
export default Button;
