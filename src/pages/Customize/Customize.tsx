import style from '../Customize/_customize.module.scss';

function CustomizePage(): JSX.Element {
  return (
    <div className={style.container}>
      <h2 className={style.title}>Pick a product you wanna customize.</h2>
    </div>
  );
}
export default CustomizePage;
