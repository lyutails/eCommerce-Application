import { getCustomer } from '../../api/createCustomer';
import style from './_main.module.scss';

function Main(): JSX.Element {
  getCustomer('TashaOneMore@example.com');
  return (
    <div className={style.main}>
      <div className={style.main_wrapper}>
        <div className={style.main_categories_block}>
          <h1 className={style.main_title}>
            Awesome RSSchool Merch Categories
          </h1>
        </div>
        <div className={style.main_advertisment}>discounts promotions</div>
        <div className={style.main_advertisment}>
          or pick and customize your own with RSSchool cool merch... paste sloth
          pic here... your advertisment can be here ^^
        </div>
        <div className={style.main_slider}>
          <div className={`${style.main_arrow} ${style.left}`}></div>
          <div className={style.main_slide}>slider product</div>
          <div className={style.main_slide}>slider product</div>
          <div className={style.main_slide}>slider product</div>
          <div className={style.main_slide}>slider product</div>
          <div className={`${style.main_arrow} ${style.right}`}></div>
        </div>
      </div>
    </div>
  );
}
export default Main;
