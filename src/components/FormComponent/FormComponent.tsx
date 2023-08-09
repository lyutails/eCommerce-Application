import style from '../FormComponent/_form.module.scss';
import Input from '../Input/Input';
import { email, password } from '../Input/input-data';

function FormComponent(): JSX.Element {
  return (
    <form className={style.form} action="">
      <Input {...email} />
      <Input {...password} />
    </form>
  );
}

export default FormComponent;
