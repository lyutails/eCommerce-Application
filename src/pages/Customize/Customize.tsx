import style from '../Customize/_customize.module.scss';

function CustomizePage(): JSX.Element {
  return (
    <div className={style.container}>
      <h2 className={style.title}>Pick a product you wanna customize</h2>
      <p className={style.subtitle}>
        Choose desired art and signature and we will create and paint picked
        product for you as well as deliver it right to your door. This thing
        will be personal and unique just like you!
      </p>
    </div>
  );
}
export default CustomizePage;
