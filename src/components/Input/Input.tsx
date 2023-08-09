import style from '../Input/_input.module.scss';
import { InputCustomFields } from '../../types/interfaces';
// import { clue } from '../Input/input-data';

function Input(props: InputCustomFields): JSX.Element {
  return (
    <div className={style.wrapper}>
      <div className={style.label}>
        <div className={style.label_img}>
          <img className={style.label_img_icon} src={props.img1} alt="Icon" />
        </div>
        <input
          className={style.label_input}
          type={props.type}
          placeholder={props.placeholder}
          required
        />
      </div>
      <span className={style.clue}></span>
    </div>
  );
}

export default Input;
