// import { categories } from '../../api/createClient';
import { useDispatch, useSelector } from 'react-redux';
import style from './_main.module.scss';
import { useEffect, useState } from 'react';
import { ICategoryState, IRootState } from '../../types/interfaces';
import { createCategory } from '../../store/reducers/categoryReducer';
import { GetCategories } from '../../api/getCategories';

function Main(): JSX.Element {
  const category = useSelector(
    (state: ICategoryState) => state.category.category
  );
  const dispatch = useDispatch();
  useEffect(() => {
    GetCategories().then((response) => {
      dispatch(createCategory(response));
      console.log(category);
    });
  }, []);
  // const [allCategories, setAllCategories] = useState<string[]>([]);
  // useEffect(() => {
  //   categories.then((response) => {
  //     // category = response;
  //     setAllCategories(response);
  //   });
  //   // return response;
  // }, []);
  return (
    <div className={style.main}>
      <div className={style.main_wrapper}>
        <div className={style.main_categories_block}>
          <h1 className={style.main_title}>
            Awesome RSSchool Merch Categories
          </h1>
          <div className={style.main_categories}>
            {category.map((categor) => {
              return (
                <div className={style.main_category} key={categor}>
                  add Sloth pic here staring at / choosing {categor}
                </div>
              );
            })}
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

//   {menuList.map((item, index) => {
//     const {id, idx, img, name, description, price, weight} = item;
//     return(
//         <Link to = {`/products/${id}`} key= {index}>
//         <Card
//             idx = {idx}
//             id={id}
//             img={img}
//             name ={name}
//             description ={description}
//             price ={price}
//             weight ={weight}
//         />
//         </Link>
//     );
// })}
