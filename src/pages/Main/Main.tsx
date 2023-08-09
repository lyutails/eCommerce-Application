// import style from './_main.scss';
// import { tokenCustomer } from '../../src/api/clientBuilder';
// import { tokenAdmin } from '../../src/api/adminBuilder';
// import { apiRoot, getAllCustomers, getAllProducts } from '../api/createClient';
// import { apiRoot } from '../../src/api/createClientAdmin';
import { getAllProducts, getCategories } from '../../api/createClient';
import style from './_main.module.scss';
// import { useDispatch, useSelector } from 'react-redux';
// import { setImage } from '../store/counterSlice';

function Main(): JSX.Element {
  console.log(getCategories());
  return (
    <div className={style.main}>
      <div className={style.main_wrapper}>
        <div className={style.main_categories_block}>
          <h1 className={style.main_title}>
            Awesome RSSchool Merch Categories
          </h1>
          <div className={style.main_categories}>
            <div className={style.main_category}>
              add Sloth pic here staring at / choosing Clothes
            </div>
            <div className={style.main_category}>
              add Sloth pic here staring at / choosing PC gadgets
            </div>
            <div className={style.main_category}>
              add Sloth pic here staring at / choosing Souvenirs
            </div>
            <div className={style.main_category}>
              add Sloth pic here staring at / choosing Active things
            </div>
          </div>
        </div>
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

// <div className={style.main_arrow + ' ' + style.left}></div>
// <div className={`${style.main_arrow} ${style.left}`}></div>
