import { ButtonCustomFields } from '../../../types/interfaces';
import style from '../ButtonForm/_button.module.scss';

function ButtonForm(props: ButtonCustomFields): JSX.Element {
  return (
    <button
      className={`${props.classNames} ${style.button}`}
      type={props.type || 'button'}
    >
      {props.children}
    </button>
  );
}
export default ButtonForm;
