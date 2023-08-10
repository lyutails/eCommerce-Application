import { IButtonCustomFields } from '../../../types/interfaces';

function ButtonForm(props: IButtonCustomFields): JSX.Element {
  return (
    <button className={props.classNames} type={props.type || 'button'}>
      {props.children}
    </button>
  );
}
export default ButtonForm;
