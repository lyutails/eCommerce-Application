import { IButtonCustomFields } from '../../../types/interfaces';

function ButtonForm(props: IButtonCustomFields): JSX.Element {
  return (
    <button
      onClick={props.onClick}
      className={props.classNames}
      type={props.type || 'button'}
    >
      {props.children}
    </button>
  );
}
export default ButtonForm;
